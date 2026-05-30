# AI Maturity Scale

![AI Maturity Dashboard Preview](app/assets/public/landing.webp)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Alpine.js](https://img.shields.io/badge/Alpine.js-8BC0D0?style=flat-square&logo=alpinejs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)

## Structure

```txt
.
├── app/                            # Web interface
│   ├── index.html                  # Main page
│   └── assets/                     # Resources
│       ├── css/                    # Styles
│       ├── js/                     # Scripts
│       └── public/                 # Images & media
├── api/                            # Serverless Functions (Vercel)
│   ├── stats.py
│   └── submit.py
├── local_server.py                 # Local Python server for testing
├── vercel.json                     # Vercel configuration
├── .gitignore
└── README.md
```

## Main Features

![Diagnostic form](app/assets/public/form.webp)
The questionnaire is based on **20 criteria** (Q01 to Q20), divided into five dimensions: Knowledge, Familiarization, Uses, Advanced Uses, and Expert Uses. Each criterion is evaluated according to three acquisition thresholds (Not acquired, Partial, Acquired) to establish a global score out of 20. This result allows classifying the user according to **5 maturity levels**, from Novice to Expert.

<br>

![Results restitution](app/assets/public/result.webp)
At the end of the evaluation, the system delivers an immediate analytical restitution with comparative statistics. The profile exposes a radar superimposing performances to the global average, as well as bars measuring the deviation from the norm per criterion. The report can be exported in PDF format (`Diagnostic-maturite-IA.pdf`).

### Distribution of AI Tools by Score

The 40 tools in the catalog are each assigned to a score range `[min, max]`. The recommendation algorithm selects the 9 most relevant tools for the obtained score. You can consult the [complete catalog of applications and tools](app/assets/public/icons/README.md) to see the detailed list (links, icons, score ranges, and descriptions).

#### Score Range of Each Tool

![Distribution of AI tools by score range](app/assets/public/figures/tool_distribution_ranges.png)

#### Density of Available Tools by Score

![Density of tools by score and by category](app/assets/public/figures/tool_distribution_density.png)

## Run Locally

```bash
export SUPABASE_URL="your_supabase_url"
export SUPABASE_KEY="your_supabase_key"
python local_server.py
```

Then open `http://localhost:8080/`.

> **Note**: Data is securely stored on Supabase via its native REST API (zero local dependencies required).

## To-Do

- [ ] **Data export**: Create an automated script for frequent export of Supabase data to CSV (testing and analysis on anonymized results).
- [ ] **Domain name**: Configure Vercel to use the custom domain `https://acculturation-numerique.fr/intelligence-artificielle/diagnostic/`.
- [ ] **Website integration**: Add a Call to Action (CTA) on the `https://acculturation-numerique.fr/intelligence-artificielle/` page to redirect to the diagnostic.
- [ ] **QR Code**: Generate a permanent QR Code pointing to the diagnostic to easily display it in class and at conferences.
