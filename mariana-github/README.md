# Mariana In España — Blog Setup Guide

Your complete website is ready. Follow these steps exactly and your site will be live in under 30 minutes.

---

## STEP 1: Create a GitHub Account

1. Go to **github.com** and sign up for a free account
2. Choose a username — this will be part of your site URL initially (e.g. `marianaespana`)

---

## STEP 2: Create Your Repository

1. Once logged in, click the **+** button (top right) → **New repository**
2. Name it exactly: `yourusername.github.io`
   - Replace `yourusername` with your actual GitHub username
   - Example: if your username is `marianaespana`, name it `marianaespana.github.io`
3. Set it to **Public**
4. Click **Create repository**

---

## STEP 3: Upload Your Site Files

1. On the repository page, click **uploading an existing file**
2. Drag ALL the files and folders from this zip into the upload area
3. Scroll down, add a commit message like "Initial site upload"
4. Click **Commit changes**

> ⚠️ Important: Make sure you upload the CONTENTS of the folder, not the folder itself. You should see files like `index.html`, `_config.yml`, `Gemfile` etc. at the root level.

---

## STEP 4: Enable GitHub Pages

1. In your repository, go to **Settings** (top tab)
2. Scroll down to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Under **Branch**, select **main** and **/ (root)**
5. Click **Save**

Your site will be live at `https://yourusername.github.io` within 2-5 minutes.

---

## STEP 5: Set Up Your Custom Domain (marianaInespana.com)

Once you buy your domain:

1. In GitHub Pages settings, enter `marianaInespana.com` in the **Custom domain** field
2. Click Save
3. At your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:

**A Records** (point to GitHub):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record**:
```
www → yourusername.github.io
```

DNS changes take 24-48 hours to fully propagate.

---

## STEP 6: Customize Your Site

### Update _config.yml
Open `_config.yml` and change:
- `url` to your actual domain
- `tiktok`, `instagram`, `youtube` to your real handles

### Add Your Photo
Replace the "M" placeholder in the sidebar by adding your photo to `/assets/images/mariana.jpg` and updating `_includes/sidebar.html`:
```html
<img src="/assets/images/mariana.jpg" alt="Mariana" class="author-avatar">
```

### Update Social Links
In `_includes/header.html`, `_includes/footer.html`, and `_includes/sidebar.html`, replace `#` with your real social media URLs.

---

## STEP 7: Write Your First Post

Create a new file in the `_posts` folder. The filename format MUST be:
```
YYYY-MM-DD-your-post-title.md
```

Example: `2025-03-15-moving-to-spain-first-week.md`

Every post starts with this "front matter" at the top:
```yaml
---
layout: post
title: "Your Post Title Here"
date: 2025-03-15
category: Daily Life
tags: [spain, moving, expat]
excerpt: "A short description that shows up in Google previews and post cards."
image: /assets/images/your-image.jpg  # optional
---

Your post content goes here, written in Markdown.
```

---

## STEP 8: Set Up Your Contact Form

The contact form is pre-built. To activate it:

1. Go to **formspree.io** and create a free account
2. Create a new form
3. Copy your form ID (looks like: `xkgrpbnj`)
4. In `contact/index.html`, replace `YOUR_FORM_ID` with your actual ID:
   ```html
   action="https://formspree.io/f/xkgrpbnj"
   ```

Free tier allows 50 submissions/month — plenty to start.

---

## STEP 9: Set Up Email Newsletters

For your newsletter signup, connect it to **Mailchimp** (free up to 500 subscribers):

1. Create a Mailchimp account
2. Create an Audience
3. Go to **Embedded Forms** and copy the form `action` URL
4. In `_includes/sidebar.html`, replace the newsletter form `action="#"` with your Mailchimp URL

---

## Adding Downloadable Resources

To add a PDF for download:

1. Add your PDF file to `/assets/downloads/your-file.pdf`
2. In your resources page, the download links already point to this path:
   ```html
   <a href="/assets/downloads/your-file.pdf" download>↓ Download PDF</a>
   ```

---

## Editing Posts After Publishing

Simply edit the `.md` file in the `_posts` folder on GitHub (click the file → pencil icon → edit → commit). Changes go live in 1-2 minutes.

---

## Folder Structure Reference

```
mariana-github/
├── _config.yml          ← Site settings (edit this first)
├── _layouts/            ← Page templates (don't need to touch)
├── _includes/           ← Header, footer, sidebar (edit for links/social)
├── _posts/              ← YOUR BLOG POSTS GO HERE
├── assets/
│   ├── css/main.css     ← All styles
│   ├── js/main.js       ← Search + interactions
│   └── downloads/       ← Your PDF resources go here
├── about/index.html     ← About page
├── resources/index.html ← Resources page
├── contact/index.html   ← Contact page
├── search/index.html    ← Search page
├── search.json          ← Powers the search (auto-generated)
└── index.html           ← Homepage
```

---

## Need Help?

The Jekyll documentation is at **jekyllrb.com/docs** — it's beginner-friendly.

For GitHub Pages specifically: **docs.github.com/pages**

---

*Built for Mariana In España — marianaInespana.com*
