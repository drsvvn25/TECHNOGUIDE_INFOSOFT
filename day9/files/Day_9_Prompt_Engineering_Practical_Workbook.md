# Day 9 – Prompt Engineering: Practical Workbook

## Testing Exercises - Copy & Paste into ChatGPT

---

## EXERCISE SET 1: Zero-Shot Prompts (Test These First)

### Exercise 1.1: Product Description (Zero-Shot)
**Copy this into ChatGPT:**

```
Write a product description for an eco-friendly bamboo toothbrush that targets environmentally conscious consumers aged 18-35. Highlight sustainability, durability, and effective cleaning. Use a friendly and persuasive tone. Keep it under 150 words.
```

**After Testing - Notes:**
- Quality of output: [Rate 1-5] ____
- Missing elements: ________________
- Tone accuracy: [Rate 1-5] ____
- Refinements needed: ________________

---

### Exercise 1.2: Social Media Post (Zero-Shot)
**Copy this into ChatGPT:**

```
Create an Instagram caption for a new productivity app launch. Target young professionals. Include a hook, 2-3 benefits, relevant emojis, and 4 hashtags. Keep the tone casual and motivational. Maximum 200 words.
```

**After Testing - Notes:**
- Engagement level: [Rate 1-5] ____
- CTR potential: [High/Medium/Low]
- Hashtag relevance: [Rate 1-5] ____
- What would improve it: ________________

---

### Exercise 1.3: Email Subject Line (Zero-Shot)
**Copy this into ChatGPT:**

```
Generate 5 compelling email subject lines for a 30% off seasonal sale. Target existing customers who bought in the last 6 months. Make them under 50 characters and create urgency without being pushy.
```

**After Testing - Notes:**
- Creativity: [Rate 1-5] ____
- Urgency level: [Rate 1-5] ____
- Character count accuracy: [Yes/No]
- Best option: ________________

---

## EXERCISE SET 2: Few-Shot Prompts (More Precise)

### Exercise 2.1: Product Title Writing (Few-Shot)
**Copy this into ChatGPT:**

```
Create product titles that are concise, keyword-rich, and benefit-focused. Follow these examples:

Example 1:
Product: Noise-canceling Bluetooth headphones with 30-hour battery
Title: Premium Noise-Canceling Bluetooth Headphones | 30-Hour Battery | Crystal Clear Audio

Example 2:
Product: Organic face serum with vitamin C and hyaluronic acid
Title: Organic Vitamin C Face Serum | Anti-Aging & Hydrating | 1oz Pure Formula

Now create a title for:
Product: Stainless steel insulated water bottle, 750ml, keeps drinks hot/cold for 24 hours, comes in 5 colors

Your title should:
- Be 10-15 words maximum
- Include primary benefit in first 4 words
- Mention key features separated by |
- Be SEO-friendly
```

**After Testing - Notes:**
- Structure consistency: [Rate 1-5] ____
- Keyword optimization: [Rate 1-5] ____
- Format match to examples: [Excellent/Good/Fair/Poor]
- Output quality vs. zero-shot: [Better/Same/Worse]

---

### Exercise 2.2: Customer Support Response (Few-Shot)
**Copy this into ChatGPT:**

```
Write professional customer service responses. Use these as examples:

Example 1 (Complaint):
Customer message: "I ordered this product 2 weeks ago and it hasn't arrived yet!"
Response: "Thank you for reaching out, and we sincerely apologize for the delay. Let me investigate your order immediately. Can you please provide your order number? We'll get this resolved within 24 hours or provide a full refund."

Example 2 (Question):
Customer message: "Is this product vegan-friendly?"
Response: "Great question! Yes, this product is 100% vegan and cruelty-free. We're certified by the Vegan Society and don't use any animal-derived ingredients."

Now respond to this customer message using the same professional, empathetic approach:
Customer message: "I received the wrong size. What's your return policy?"

Your response should:
- Acknowledge their issue immediately
- Provide clear solution
- Mention timeline
- Offer additional help
- Keep it under 100 words
- Be warm and professional
```

**After Testing - Notes:**
- Professionalism: [Rate 1-5] ____
- Empathy level: [Rate 1-5] ____
- Clarity of solution: [Rate 1-5] ____
- Better than zero-shot?: [Yes/No]

---

### Exercise 2.3: Marketing Email Copy (Few-Shot)
**Copy this into ChatGPT:**

```
Write marketing emails following these style examples:

Example 1 (Welcome Email):
Subject: Welcome to [Brand] – Here's 15% off your first order! 🎉
Body: "Hi [Name],

Welcome to our community! We're thrilled to have you. As a thank you, enjoy 15% off your first purchase using code: WELCOME15

Why customers love us:
• Premium quality, sustainably sourced
• 30-day satisfaction guarantee
• Free shipping on orders over $50

Explore our bestsellers →

Welcome aboard!
The [Brand] Team"

Example 2 (Limited Time Offer):
Subject: 24-Hour Flash Sale – Up to 40% Off 🔥
Body: "Hi [Name],

Don't miss this! Our most popular products are on sale for the next 24 hours only.

[Product 1] – Now $29.99 (was $49.99) SHOP
[Product 2] – Now $39.99 (was $69.99) SHOP

This offer ends TOMORROW at 11:59 PM.

Claim your savings now →

Cheers,
The [Brand] Team"

Now write a similar email for:
Product Launch Announcement for "Smart Water Bottle with Hydration Reminders" (launching next Monday)
Target: Existing health-conscious customers

Your email should:
- Have an engaging subject line under 50 characters
- Create excitement about the product
- Mention 2-3 key features
- Offer early bird discount (suggest 20% off)
- Include strong CTA
- Match the friendly, professional tone
```

**After Testing - Notes:**
- Subject line effectiveness: [Rate 1-5] ____
- Excitement created: [Rate 1-5] ____
- Format consistency: [Excellent/Good/Fair]
- Launch success potential: [High/Medium/Low]

---

## EXERCISE SET 3: Refinement & Iteration

### Exercise 3.1: Prompt Refinement Test
**Step 1: Test this (Poor) Prompt:**
```
Write marketing copy for our product.
```

**Record the output quality: [Rate 1-5] ____**

**Step 2: Test this (Better) Prompt:**
```
Write marketing copy for a premium coffee maker ($299) that:
- Target audience: Coffee enthusiasts aged 30-50 with $3000+ annual coffee budget
- Key features: Programmable, temperature control, built-in grinder
- Tone: Sophisticated but approachable
- Highlight the ritual/experience, not just features
- Include one lifestyle benefit
- Word count: 150-200 words
```

**Record the output quality: [Rate 1-5] ____**

**Improvement Analysis:**
- How much better was the second prompt?: _____%
- What made the difference?: ________________
- What else could improve it?: ________________

---

### Exercise 3.2: Testing Different Tones
**Test all three versions below (copy one at a time):**

**Version 1 - Professional Tone:**
```
Write product copy for luxury skincare serum using professional, sophisticated language. Target affluent women 40+. Emphasize science and ingredients. 150 words.
```

**Version 2 - Conversational Tone:**
```
Write product copy for luxury skincare serum using friendly, conversational language. Target millennial women who care about self-care. Make it feel like advice from a trusted friend. 150 words.
```

**Version 3 - Witty/Playful Tone:**
```
Write product copy for luxury skincare serum using witty, playful language with subtle humor. Target Gen-Z beauty-conscious consumers. Make them smile while selling the benefits. 150 words.
```

**Comparison Chart:**

| Aspect | Professional | Conversational | Witty/Playful |
|--------|-------------|----------------|--------------|
| Appeal level | ___ / 5 | ___ / 5 | ___ / 5 |
| Relevance to audience | ___ / 5 | ___ / 5 | ___ / 5 |
| Sales potential | ___ / 5 | ___ / 5 | ___ / 5 |
| Best fit for target | [ ] | [ ] | [ ] |

**Winner: ________________** because ________________

---

## EXERCISE SET 4: Building a Prompt Library

### Exercise 4.1: Document Your Best Prompts
**As you test exercises above, save successful ones here:**

#### Successful Prompt #1
- **Category:** ________________
- **Purpose:** ________________
- **Best Practices Used:** 
  - [ ] Specific audience
  - [ ] Clear tone
  - [ ] Format defined
  - [ ] Length specified
  - [ ] Examples provided
- **Output Quality:** _____ / 5
- **The Prompt:**
```
[PASTE YOUR BEST VERSION HERE]
```

#### Successful Prompt #2
- **Category:** ________________
- **Purpose:** ________________
- **Best Practices Used:** 
  - [ ] Specific audience
  - [ ] Clear tone
  - [ ] Format defined
  - [ ] Length specified
  - [ ] Examples provided
- **Output Quality:** _____ / 5
- **The Prompt:**
```
[PASTE YOUR BEST VERSION HERE]
```

---

## EXERCISE SET 5: Real-World Scenarios

### Scenario 1: Launch a New Fitness App

**Objective:** Create marketing materials for a new AI-powered fitness app

#### Task 1.1 - Zero-Shot App Description
**Copy into ChatGPT:**
```
Write a product description for FitAI, an artificial intelligence-powered fitness app that creates personalized workout plans based on user goals, fitness level, and available equipment. The app includes video guidance, form correction, and progress tracking.
```

**Observation:** What's missing from the output?
- ________________
- ________________
- ________________

#### Task 1.2 - Few-Shot App Description (Better Version)
**Copy into ChatGPT:**
```
Write a compelling product description for FitAI, an AI-powered fitness app, following this style:

Example (Fitness App):
"Your Personal AI Trainer. FitAI learns your fitness level, goals, and equipment access—then creates personalized workouts that adapt in real-time. Get form corrections, progress tracking, and motivation when you need it most."

For FitAI, your description should:
- Target: Busy professionals 25-45 wanting home fitness
- Highlight: Personalization, AI form correction, time-efficient workouts
- Address concern: "I don't know how to exercise properly"
- Include: Emotional benefit (confidence, achievement)
- Length: 100-150 words
- Tone: Motivational but realistic
```

**Comparison:**
- Zero-shot quality: _____ / 5
- Few-shot quality: _____ / 5
- Key differences: ________________

---

### Scenario 2: Promote Limited-Time Sale

**Objective:** Create urgency-driven marketing content

#### Task 2.1 - Generate Multiple Email Subject Lines
**Copy into ChatGPT:**
```
Generate 8 email subject lines for a 72-hour flash sale (40% off everything) for an online fashion retailer. Target: Female customers 18-35 who browsed in last week but didn't buy.

Requirements:
- All under 50 characters
- Create FOMO without being spammy
- Include variety: curiosity, urgency, benefit, social proof
- Avoid ALL CAPS or excessive punctuation
- Format: Number them 1-8
```

**Evaluation Criteria:**
| Subject Line # | Click-through likelihood | Relevance | Tone | Engagement |
|---|---|---|---|---|
| 1 | ___% | ___/5 | ___/5 | ___/5 |
| 2 | ___% | ___/5 | ___/5 | ___/5 |
| 3 | ___% | ___/5 | ___/5 | ___/5 |
| 4 | ___% | ___/5 | ___/5 | ___/5 |
| 5 | ___% | ___/5 | ___/5 | ___/5 |
| 6 | ___% | ___/5 | ___/5 | ___/5 |
| 7 | ___% | ___/5 | ___/5 | ___/5 |
| 8 | ___% | ___/5 | ___/5 | ___/5 |

**Top 3 Performers:**
1. ________________
2. ________________
3. ________________

---

## EXERCISE SET 6: Challenge Exercises

### Challenge 1: Create a Complete Campaign
**Brief:** You're launching a sustainable home products brand (bamboo kitchenware)

**Create all of these (copy each into ChatGPT separately):**

#### 1. Product Description Prompt
```
[WRITE YOUR PROMPT HERE - be specific about tone, audience, features, and length]
```

#### 2. Instagram Post Prompt
```
[WRITE YOUR PROMPT HERE]
```

#### 3. Email Welcome Sequence Prompt
```
[WRITE YOUR PROMPT HERE]
```

#### 4. Landing Page Headline Prompt
```
[WRITE YOUR PROMPT HERE]
```

**Document Results:**
- Most effective content: ________________
- Biggest gap/issue: ________________
- Prompt that needs refinement: ________________

---

### Challenge 2: A/B Test Two Prompt Approaches

**Product:** Premium Coffee Subscription Box

**Approach A - Direct/Simple:**
```
Write product copy for a monthly coffee subscription box. Make it sound good and mention benefits.
```

**Approach B - Detailed/Structured:**
```
Write product copy for CoffeeBliss, a premium monthly coffee subscription ($49/month) that:
- Audience: Coffee enthusiasts age 30-50 who appreciate craft and sustainability
- Unique angle: Connects subscribers with small-batch roasters worldwide
- Key benefits: Discovering new flavors, supporting small businesses, convenience
- Tone: Knowledgeable but welcoming (like a coffee expert, not a salesman)
- Structure: Hook (emotion) → Problem → Solution → Benefits → CTA
- Length: 200-250 words
- Must mention: Sourcing ethics, flavor profile variety, subscription flexibility
```

**Results Analysis:**

| Metric | Approach A | Approach B |
|--------|-----------|-----------|
| Content depth | ___/5 | ___/5 |
| Audience targeting | ___/5 | ___/5 |
| Persuasiveness | ___/5 | ___/5 |
| Accuracy to brief | ___/5 | ___/5 |
| Time to create | ___ min | ___ min |
| Overall quality | ___/5 | ___/5 |
| Winner | [ ] | [✓] |

**Key Learning:** ________________

---

## EXERCISE SET 7: Quick Daily Practice

### 5-Minute Daily Drills
**Do one each day and track results:**

#### Day 1 - Product Description
- **Topic:** [Pick any product]
- **Prompt Quality Score:** ___/5
- **Output Quality Score:** ___/5
- **Improvement:** ________________

#### Day 2 - Social Media Post
- **Topic:** [Pick any topic]
- **Prompt Quality Score:** ___/5
- **Output Quality Score:** ___/5
- **Improvement:** ________________

#### Day 3 - Email Subject Lines
- **Topic:** [Pick any campaign]
- **Prompt Quality Score:** ___/5
- **Output Quality Score:** ___/5
- **Improvement:** ________________

#### Day 4 - Sales Copy
- **Topic:** [Pick any service]
- **Prompt Quality Score:** ___/5
- **Output Quality Score:** ___/5
- **Improvement:** ________________

#### Day 5 - Review & Refine
- **Best prompt created:** ________________
- **Biggest learning:** ________________
- **Next improvement focus:** ________________

---

## Performance Tracking Sheet

### Overall Prompt Engineering Progress

| Component | Week 1 | Week 2 | Week 3 | Goal |
|-----------|--------|--------|--------|------|
| Zero-shot quality | __/5 | __/5 | __/5 | 4/5 |
| Few-shot quality | __/5 | __/5 | __/5 | 5/5 |
| Iteration skill | __/5 | __/5 | __/5 | 4.5/5 |
| Output relevance | __/5 | __/5 | __/5 | 4.5/5 |
| Time efficiency | __/5 | __/5 | __/5 | 4/5 |
| **Overall Score** | **__/25** | **__/25** | **__/25** | **22/25** |

---

## Submission Checklist

Before submitting your Day 9 work, verify:

- [ ] Tested minimum 5 zero-shot prompts in ChatGPT
- [ ] Tested minimum 5 few-shot prompts in ChatGPT
- [ ] Created marketing prompts for at least 3 categories (product, email, social)
- [ ] Documented results of all tests
- [ ] Identified at least 2 successful prompt patterns
- [ ] Created personal prompt library (5+ effective prompts)
- [ ] Completed at least 2 challenge exercises
- [ ] Compared zero-shot vs. few-shot effectiveness
- [ ] Iterated on at least 1 prompt based on results
- [ ] Documented key learnings and next steps

---

## Key Takeaways Summary

**What I Learned About Zero-Shot Prompting:**
- ________________
- ________________
- ________________

**What I Learned About Few-Shot Prompting:**
- ________________
- ________________
- ________________

**Best Practice I'll Use Going Forward:**
- ________________

**Most Surprising Discovery:**
- ________________

**Next Step for Improvement:**
- ________________

---

**End of Workbook - You've got this! 🚀**
