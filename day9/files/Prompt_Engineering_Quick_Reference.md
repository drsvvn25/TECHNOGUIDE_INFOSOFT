# Prompt Engineering Quick Reference Card

## 🎯 THE GOLDEN FORMULA FOR ANY PROMPT

```
[TASK] + [CONTEXT] + [CONSTRAINTS] + [FORMAT] = QUALITY OUTPUT
```

---

## 📋 ZERO-SHOT vs FEW-SHOT AT A GLANCE

### Zero-Shot Prompting
**Use When:** Task is simple and straightforward
**How:** Ask directly without examples
**Format:** 1-3 sentences describing what you want

```
Prompt: Write a product description for organic coffee.
Result: Basic description, may lack specific focus
```

**Pros:** Quick, simple, fewer tokens
**Cons:** Less control, may miss specifics

---

### Few-Shot Prompting
**Use When:** Task is complex or needs specific format
**How:** Provide 1-2 examples before the actual task
**Format:** Examples + clear task + requirements

```
Example 1: [GOOD EXAMPLE OUTPUT]
Example 2: [GOOD EXAMPLE OUTPUT]
Now do this: [YOUR TASK]
```

**Pros:** Better quality, more consistent, more control
**Cons:** Longer prompts, more setup time

---

## ✅ THE ESSENTIALS CHECKLIST

Every prompt should include:

1. **TASK** - What do you want?
   - "Write a product description..."
   - "Generate 5 email subject lines..."
   - "Create an Instagram caption..."

2. **AUDIENCE** - Who is this for?
   - "Target: Female professionals 25-40"
   - "For environmentally conscious consumers"
   - "Tech-savvy millennials interested in fitness"

3. **TONE** - What's the voice?
   - Professional / Casual / Witty / Motivational
   - Formal / Friendly / Luxury / Humorous

4. **FORMAT** - How should it look?
   - Word count (200-300 words)
   - Structure (intro → 3 points → CTA)
   - List format / Email format / Social post

5. **KEY ELEMENTS** - What must be included?
   - Must mention: [Feature/Benefit/Detail]
   - Highlight: [Main selling point]
   - Include: [3 key points]

6. **CONSTRAINTS** - What to avoid?
   - Don't use: [Overused phrases]
   - Avoid: [Clichés/Brand competitors]
   - No more than: [Length limit]

---

## 🚀 MAGIC PROMPT TEMPLATES

### Template 1: Product Description
```
Write a [TONE] product description for [PRODUCT NAME] that:
- Targets [AUDIENCE]
- Highlights [FEATURE 1], [FEATURE 2], [FEATURE 3]
- Opens with [MAIN BENEFIT]
- Uses [3 POWER WORDS]
- Addresses this concern: [OBJECTION]
- Length: [WORD COUNT] words
- Ends with [STRONG REASON TO BUY]
```

### Template 2: Social Media Post
```
Create a [PLATFORM] post for [TOPIC] that:
- Hooks viewers with: [EMOTION/CURIOSITY/URGENCY]
- Target: [SPECIFIC AUDIENCE]
- Tone: [TONE]
- Must include: [KEY MESSAGE]
- CTA: [DESIRED ACTION]
- Hashtags: [NUMBER & TOPICS]
- Length: [MAX WORDS/CHARACTERS]
```

### Template 3: Email Copy
```
Write a [EMAIL TYPE] email that:
- Subject line (under 50 chars): [GOAL]
- Audience: [WHO]
- Opening: [HOOK TYPE]
- Main message: [KEY BENEFIT]
- Include: [SOCIAL PROOF/OFFER/URGENCY]
- CTA button text: [SPECIFIC TEXT]
- Tone: [TONE]
- Closing: [TYPE]
```

### Template 4: Sales Copy
```
Write sales copy for [PRODUCT] that:
- Addresses this pain: [PROBLEM]
- Solves it with: [SOLUTION]
- 3-5 key benefits: [LIST]
- Proof/social proof: [TYPE]
- Objection to address: [CONCERN]
- Strong closing: [EMOTIONAL APPEAL]
- CTA: [SPECIFIC ACTION]
```

---

## 🎨 TONE WORDS QUICK REFERENCE

| Tone | Use When | Example Words |
|------|----------|-----------------|
| **Professional** | B2B, finance, corporate | competent, reliable, proven, leverage, streamline |
| **Casual** | Social media, Gen Z, fun brands | cool, awesome, hey, check this out, vibe |
| **Luxury** | Premium products, wealth | exquisite, crafted, bespoke, refined, exclusive |
| **Urgent** | Sales, limited offers | now, today, limited, don't miss, last chance |
| **Educational** | Guides, tutorials | discover, learn, guide, step-by-step, understand |
| **Motivational** | Fitness, self-help, growth | achieve, transform, empower, strength, overcome |
| **Witty/Humorous** | Millennial brands, entertainment | fun wordplay, unexpected humor, relatable jokes |
| **Empathetic** | Customer service, health | understand, feel, support, care, here for you |

---

## 📊 MARKETING PROMPT CATEGORIES

### Category 1: Product Marketing
- Product descriptions
- Feature/benefit highlights
- Product comparisons
- Use case scenarios
- Product titles/SEO

**Best Approach:** Few-shot (for consistency)

### Category 2: Social Media
- Instagram captions
- Twitter/X posts
- LinkedIn articles
- TikTok scripts
- Pinterest pins

**Best Approach:** Few-shot (tone matters)

### Category 3: Email Marketing
- Subject lines
- Welcome sequences
- Promotional emails
- Abandoned cart
- Customer newsletters

**Best Approach:** Few-shot (format crucial)

### Category 4: Sales & Conversion
- Landing page copy
- CTA button text
- Sales pages
- Email sales sequences
- Objection handling

**Best Approach:** Few-shot (specificity needed)

### Category 5: Content Marketing
- Blog titles
- Blog outlines
- Video scripts
- Case studies
- How-to guides

**Best Approach:** Zero-shot for ideas, Few-shot for format

### Category 6: Customer Service
- Response templates
- FAQ answers
- Support emails
- Complaint responses
- Feedback replies

**Best Approach:** Few-shot (tone & professionalism)

---

## 🔄 THE ITERATION FRAMEWORK

### If Output Isn't Perfect:

**Option A: Clarify**
```
Follow-up: "Make it more [ADJECTIVE]"
"Remove the [ELEMENT]"
"Focus on [DIFFERENT ANGLE]"
```

**Option B: Add Examples**
```
Follow-up: "Here's what I'm looking for:
[GOOD EXAMPLE]
Try again with this style."
```

**Option C: Reframe**
```
Follow-up: "Rewrite this as [DIFFERENT FORMAT]"
"Approach it from [DIFFERENT ANGLE]"
"Target [DIFFERENT AUDIENCE] instead"
```

**Option D: Specify More**
```
Follow-up: "Add [MISSING ELEMENT]"
"Include [SPECIFIC DETAIL]"
"Make it [MORE/LESS] [ADJECTIVE]"
```

---

## ⚡ QUICK POWER WORDS FOR MARKETING

### Action Words
convince, transform, unlock, discover, capture, ignite, amplify, revolutionize, unleash

### Benefit Words
effortless, seamless, instantly, premium, exclusive, proven, guaranteed, trusted, powerful

### Curiosity Words
surprisingly, uncovered, revealed, secrets, breakthrough, untold, unexpected, hidden

### Urgency Words
limited, only, today, now, before, deadline, final, last chance, don't miss

### Trust Words
certified, award-winning, expert, proven, trusted, backed, guaranteed, verified, authentic

---

## 🎯 PROMPT TESTING CHECKLIST

Before copying to ChatGPT, ask:

- [ ] Is my task clearly stated?
- [ ] Did I define the target audience?
- [ ] Is the tone specified?
- [ ] Are format requirements clear?
- [ ] Did I set length/word count limits?
- [ ] For complex tasks—did I add examples?
- [ ] Are constraints listed (what to avoid)?
- [ ] Is the desired outcome explicit?
- [ ] Could someone else understand this prompt?
- [ ] Have I been specific (no vague words)?

---

## 📈 WHEN TO USE WHAT

### Use ZERO-SHOT When:
✓ Task is very simple
✓ You just need ideas
✓ You want speed
✓ Consistency doesn't matter
✓ You're brainstorming

**Example:** "What are some good email subject line ideas?"

---

### Use FEW-SHOT When:
✓ Task is complex
✓ Specific format needed
✓ Consistency is important
✓ You care about quality
✓ You need control over output

**Example:** "Write an email subject line following this style... [EXAMPLE]"

---

## 🚀 PRO TIPS FOR PROMPT SUCCESS

1. **Be Specific, Not Vague**
   ❌ "Write good marketing copy"
   ✅ "Write 200-word marketing copy for eco-conscious women 25-35, emphasizing sustainability"

2. **Show, Don't Tell**
   ❌ "Make it funny"
   ✅ "Use witty wordplay and unexpected humor like: [EXAMPLE]"

3. **One Task at a Time**
   ❌ "Write product description AND email subject lines"
   ✅ "Write a product description for [PRODUCT]" (then ask for subject lines separately)

4. **Define Your Success**
   ❌ "Make it catchy"
   ✅ "Make it memorable with alliteration, under 50 characters"

5. **Test & Iterate**
   ✅ Send prompt → Review output → Refine prompt → Send again

6. **Build a Library**
   ✅ Save successful prompts
   ✅ Note what worked
   ✅ Reuse and adapt them

---

## 📱 TESTING IN CHATGPT - 4 STEPS

1. **Copy** your prompt into ChatGPT
2. **Send** and review the output
3. **Evaluate** against your checklist
4. **Iterate** with follow-up prompts until satisfied

---

## 🎓 LEARNING PROGRESSION

### Week 1: Foundation
- Write 5 zero-shot prompts
- Test each in ChatGPT
- Note what works and what doesn't
- Focus on clarity

### Week 2: Few-Shot Mastery
- Create 5 few-shot prompts
- Include good examples
- Test variations
- Focus on consistency

### Week 3: Expertise
- Combine techniques
- Build prompt library
- Create templates
- Master iteration

### Week 4: Mastery
- Predict output quality before testing
- Write prompts first try that work
- Help others improve their prompts
- Create custom prompt systems

---

## ❓ TROUBLESHOOTING COMMON ISSUES

| Problem | Solution |
|---------|----------|
| Output too vague | Add specifics: audience, tone, format |
| Output too long | Specify word count limit |
| Wrong tone | Provide example or redefine tone word |
| Missing key info | List must-includes explicitly |
| Not actionable | Specify desired action/outcome clearly |
| Format wrong | Show example of correct format |
| Too generic | Add unique angle or constraint |
| Contradictory output | Avoid conflicting requirements |

---

## 💡 FINAL PRO MOVES

### Pro Move 1: The Template Approach
Create 3-5 reusable templates for each content type you create frequently.

### Pro Move 2: The Example Library
Build a collection of great outputs (from your prompts) to use as examples in future few-shot prompts.

### Pro Move 3: The Refinement Cycle
Always ask: "What's one way to make this better?" and iterate.

### Pro Move 4: The Checklist Method
Use the same checklist for every prompt to ensure consistency.

### Pro Move 5: The Documentation Habit
Note what worked, why it worked, and when to use it again.

---

**Save this reference card and return to it whenever you write a prompt! 🎯**

*Last Updated: May 2026*
