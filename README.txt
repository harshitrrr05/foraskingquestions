LITTLE HEART-TO-HEART — THREE-PAGE FLOW (Vercel-ready)

Files:
- index.html — all three screens (intro, questions, surprise note)
- style.css — mobile-responsive styling and animations
- script.js — page navigation, progress, and email submission

FLOW
1. First screen: "Okay, let's go" opens the questions screen.
2. Second screen: answer as many questions as you want.
3. "Send my answers & see surprise" submits to Formspree if configured, then reveals the letter.
   If email isn't configured, the letter still opens, and the page explicitly tells the site owner to connect email delivery.

CONNECT EMAIL
1. Visit https://formspree.io/ and create a form.
2. Verify the email address that should receive submissions.
3. Copy the endpoint Formspree gives you (format: https://formspree.io/f/abcdwxyz).
4. In script.js replace https://formspree.io/f/YOUR_FORM_ID with your endpoint.
5. Test a submission and check your spam/junk folder if needed.
Never place your email password or private API keys in browser JavaScript.

DEPLOY ON VERCEL (phone-friendly)
1. Extract the ZIP on your phone, or upload the three files to a GitHub repository.
2. Go to https://vercel.com/ and sign up / log in.
3. Easiest reliable method: upload the project to a GitHub repository, then in Vercel choose "Add New..." → "Project" and import that repository.
4. Framework Preset: choose "Other". Build Command: leave blank. Output Directory: leave blank or use "." if the dashboard requires a value. No server-side build is needed for this static site.
5. Click Deploy. Vercel will provide a live URL.
6. After changing files, push the changes to GitHub; Vercel will redeploy automatically.

Alternative: if your Vercel dashboard offers direct deployment from the CLI, that requires a computer/terminal. For a phone-only workflow, GitHub import is the easier option.

Privacy note: the page tells respondents their answers are emailed to the site owner. Keep that notice. Do not ask for passwords, OTPs, or sensitive information.
