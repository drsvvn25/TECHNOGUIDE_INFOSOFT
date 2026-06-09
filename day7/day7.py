# =========================================
# IPL Data Analysis and Visualization Web App
# =========================================

# Import Required Libraries
import pandas as pd
import numpy as np
import streamlit as st
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from scipy.stats import zscore

# =========================================
# Streamlit Title
# =========================================

st.title("IPL Player Performance Analysis System")

st.write("Analyze IPL player performance using Machine Learning and Data Visualization")

# =========================================
# Data Analysis Section
# =========================================

# Load cricket data for analysis
try:
    df_cricket = pd.read_csv("cricket_data.csv")
    
    # Data preprocessing
    numeric_columns = ['Matches_Batted', 'Not_Outs', 'Runs_Scored', 'Balls_Faced', 'Batting_Strike_Rate', 
                       'Centuries', 'Half_Centuries', 'Fours', 'Sixes', 'Catches_Taken', 'Stumpings',
                       'Matches_Bowled', 'Balls_Bowled', 'Runs_Conceded', 'Wickets_Taken', 'Bowling_Average',
                       'Economy_Rate', 'Bowling_Strike_Rate', 'Four_Wicket_Hauls', 'Five_Wicket_Hauls']
    
    existing_numeric_columns = [col for col in numeric_columns if col in df_cricket.columns]
    df_cricket[existing_numeric_columns] = df_cricket[existing_numeric_columns].replace("No stats", np.nan)
    df_cricket[existing_numeric_columns] = df_cricket[existing_numeric_columns].apply(pd.to_numeric, errors='coerce')
    df_cricket['Batting_Average'] = pd.to_numeric(df_cricket['Batting_Average'], errors='coerce')
    df_cricket['Highest_Score'] = pd.to_numeric(df_cricket['Highest_Score'].astype(str).str.replace('*', '', regex=False), errors='coerce')
    # Convert Year to numeric where possible and keep original years for season plotting
    if 'Year' in df_cricket.columns:
        df_cricket['Year'] = pd.to_numeric(df_cricket['Year'], errors='coerce')
    df_cricket.fillna(0, inplace=True)
    
    st.subheader("Cricket Dataset Overview")
    st.write(df_cricket.head())
    st.write(df_cricket.describe())

    # Sidebar filters
    st.sidebar.header("Filters")
    players = sorted(df_cricket['Player_Name'].unique())
    selected_players = st.sidebar.multiselect("Select players to display (leave empty = all)", players)
    if selected_players:
        df = df_cricket[df_cricket['Player_Name'].isin(selected_players)].copy()
    else:
        df = df_cricket.copy()
    
    # EDA Visualizations
    st.subheader("Exploratory Data Analysis")
    
    # Runs Distribution
    col1, col2 = st.columns(2)
    with col1:
        st.write("**Runs Distribution**")
        fig, ax = plt.subplots(figsize=(10, 5))
        sns.histplot(df['Runs_Scored'], bins=30, kde=True, color='blue', ax=ax)
        ax.set_title("Distribution of Runs")
        ax.set_xlabel("Runs")
        ax.set_ylabel("Frequency")
        st.pyplot(fig)
        plt.close()
    
    with col2:
        st.write("**Top 10 Run Scorers**")
        # Compute top scorers within the filtered dataset (aggregate across seasons)
        top_scorers = df.groupby('Player_Name', as_index=False)['Runs_Scored'].sum().nlargest(10, 'Runs_Scored')
        fig, ax = plt.subplots(figsize=(12, 6))
        sns.barplot(x='Runs_Scored', y='Player_Name', data=top_scorers, palette='coolwarm', ax=ax)
        ax.set_title("Top 10 Run Scorers in IPL")
        ax.set_xlabel("Total Runs")
        ax.set_ylabel("Player")
        st.pyplot(fig)
        plt.close()
    
    # Batting Average vs Strike Rate
    st.write("**Batting Average vs Strike Rate**")
    fig, ax = plt.subplots(figsize=(10, 5))
    # Show player hue only when a small number of players are in view
    if df['Player_Name'].nunique() <= 10:
        sns.scatterplot(x=df['Batting_Average'], y=df['Batting_Strike_Rate'], hue=df['Player_Name'], ax=ax)
    else:
        sns.scatterplot(x=df['Batting_Average'], y=df['Batting_Strike_Rate'], color='tab:green', ax=ax)
    ax.set_title("Batting Average vs Strike Rate")
    ax.set_xlabel("Batting Average")
    ax.set_ylabel("Strike Rate")
    st.pyplot(fig)
    plt.close()
    
    # Correlation Heatmap
    st.write("**Feature Correlation Matrix**")
    numeric_df = df.select_dtypes(include=[np.number])
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.heatmap(numeric_df.corr(), annot=True, cmap='coolwarm', fmt='.2f', ax=ax)
    ax.set_title("Feature Correlation Matrix")
    st.pyplot(fig)
    plt.close()
    
    # Business Data Analysis
    st.subheader("Business Data Analysis")
    
    col3, col4, col5 = st.columns(3)
    with col3:
        st.write("**Top 5 by Runs**")
        top_runs = df.groupby('Player_Name', as_index=False)['Runs_Scored'].sum().sort_values(by='Runs_Scored', ascending=False).head()
        st.write(top_runs)
    
    with col4:
        st.write("**Top 5 by Wickets**")
        top_wickets = df.groupby('Player_Name', as_index=False)['Wickets_Taken'].sum().sort_values(by='Wickets_Taken', ascending=False).head()
        st.write(top_wickets)
    
    with col5:
        st.write("**Top 5 by Strike Rate**")
        top_sr = df.groupby('Player_Name', as_index=False)['Batting_Strike_Rate'].mean().sort_values(by='Batting_Strike_Rate', ascending=False).head()
        st.write(top_sr)
    
    # Correlation value
    corr_value = df['Batting_Average'].corr(df['Batting_Strike_Rate'])
    st.write(f"**Correlation between Batting Average and Strike Rate:** {corr_value:.2f}")
    
    # Performance Trend Prediction
    st.subheader("Performance Trend Prediction")
    # Use Year for season trends. If Year is not present or zero, fall back to index
    if 'Year' in df.columns and df['Year'].gt(0).any():
        year_col = 'Year'
    else:
        df = df.reset_index().rename(columns={'index': 'Year'})
        year_col = 'Year'

    # If a single player is selected, plot that player's year-wise runs and predict trend.
    if df['Player_Name'].nunique() == 1:
        player = df['Player_Name'].iloc[0]
        df_player = df.sort_values(by=year_col)
        X_trend = df_player[[year_col]]
        y_trend = df_player['Runs_Scored']
        if len(X_trend) >= 2:
            trend_model = LinearRegression()
            trend_model.fit(X_trend, y_trend)
            df_player['Predicted_Runs'] = trend_model.predict(X_trend)
        else:
            df_player['Predicted_Runs'] = y_trend

        fig, ax = plt.subplots(figsize=(10, 5))
        ax.plot(df_player[year_col], df_player['Runs_Scored'], marker='o', label='Actual Runs')
        ax.plot(df_player[year_col], df_player['Predicted_Runs'], linestyle='dashed', label='Predicted Runs')
        ax.set_title(f"Performance Trend - {player}")
        ax.set_xlabel("Season")
        ax.set_ylabel("Runs")
        ax.legend()
        st.pyplot(fig)
        plt.close()
    else:
        # Group by year and show aggregated trend
        df_year = df.groupby(year_col, as_index=False)['Runs_Scored'].mean().sort_values(by=year_col)
        if df_year.shape[0] >= 2:
            X_trend = df_year[[year_col]]
            y_trend = df_year['Runs_Scored']
            trend_model = LinearRegression()
            trend_model.fit(X_trend, y_trend)
            df_year['Predicted_Runs'] = trend_model.predict(X_trend)

            fig, ax = plt.subplots(figsize=(10, 5))
            ax.plot(df_year[year_col], df_year['Runs_Scored'], marker='o', label='Actual (mean runs)')
            ax.plot(df_year[year_col], df_year['Predicted_Runs'], linestyle='dashed', label='Predicted')
            ax.set_title("Performance Trend - Avg Runs per Season")
            ax.set_xlabel("Season")
            ax.set_ylabel("Runs")
            ax.legend()
            st.pyplot(fig)
            plt.close()
    
    # Underrated Players
    st.subheader("Underrated Players Analysis")
    performance_cols = ['Runs_Scored', 'Wickets_Taken', 'Batting_Strike_Rate', 'Economy_Rate']
    df_cricket['Z_Score'] = df_cricket[performance_cols].apply(zscore).mean(axis=1)
    underrated_players = df_cricket[df_cricket['Z_Score'] < 0]
    
    st.write("**Top 10 Underrated Players:**")
    st.write(underrated_players[['Player_Name', 'Z_Score']].sort_values(by='Z_Score').head(10))
    
except FileNotFoundError:
    st.error("cricket_data.csv file not found. Please ensure the file is in the same directory.")

# =========================================
# Footer
# =========================================

st.write("IPL Player Performance Analysis using Machine Learning and Streamlit")