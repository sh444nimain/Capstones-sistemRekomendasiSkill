import ast
from collections import Counter

import matplotlib.pyplot as plt
import pandas as pd
import streamlit as st


DATA_PATH = "cleaned_all_job.csv"

CHART_BG = "#181818"
CHART_TEXT = "#ffffff"
CHART_MUTED = "#a8a8a8"
CHART_GRID = "#333333"

CONTACTS = [
    {
        "name": "Giga Syahbani",
        "role": "CDCC329D6Y0622",
        "linkedin": "https://www.linkedin.com/in/gasahbani/",
        "instagram": "https://www.instagram.com/gasahbani/",
    },
    {
        "name": "Zurich Sabil",
        "role": "CDCC329D6Y0598",
        "linkedin": "https://www.linkedin.com/in/zurich-sabil-61957b34a/",
        "instagram": "https://www.instagram.com/zurich27_/",
    },
]


st.set_page_config(
    page_title="Dashboard SkillMatch.AI",
    layout="wide",
)


st.markdown(
    """
    <style>
    :root {
        --canvas: #0f0f0f;
        --canvas-deep: #000000;
        --surface-card: #181818;
        --surface-elevated: #222222;
        --surface-strong: #2a2a2a;
        --hairline: #333333;
        --hairline-soft: #222222;
        --ink: #ffffff;
        --body: #a8a8a8;
        --muted: #888888;
        --primary: #0007cd;
        --primary-glow: #1a26ff;
        --accent-cyan: #00d4ff;
        --accent-violet: #7b3aed;
    }

    .stApp {
        background:
            radial-gradient(circle at 50% 0%, rgba(26, 38, 255, 0.26), rgba(15, 15, 15, 0) 34rem),
            var(--canvas);
        color: var(--ink);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .block-container {
        max-width: 1240px;
        padding-top: 2rem;
        padding-bottom: 3rem;
    }

    h1, h2, h3, h4, h5, h6,
    [data-testid="stMarkdownContainer"] p,
    [data-testid="stMarkdownContainer"] li {
        color: var(--ink);
    }

    [data-testid="stCaptionContainer"],
    label,
    .stMarkdown small {
        color: var(--body);
    }

    [data-testid="stSidebar"] {
        background: var(--surface-card);
        border-right: 1px solid var(--hairline-soft);
    }

    [data-testid="stSidebar"] [data-testid="stSidebarContent"] {
        padding: 2rem 1.15rem;
    }

    [data-testid="stSidebar"] * {
        color: var(--ink);
    }

    [data-testid="stSidebar"] label,
    [data-testid="stSidebar"] p {
        color: var(--body);
    }

    [data-testid="stSidebar"] h1,
    [data-testid="stSidebar"] h2,
    [data-testid="stSidebar"] h3 {
        color: var(--ink);
        letter-spacing: 0;
    }

    [data-testid="stSidebar"] [data-testid="stVerticalBlockBorderWrapper"] {
        background: rgba(0, 0, 0, 0.42);
        border: 1px solid var(--hairline);
        border-radius: 16px;
    }

    [data-testid="stSidebar"] [data-baseweb="select"] > div {
        background: var(--canvas-deep);
        border: 1px solid var(--hairline);
        border-radius: 8px;
    }

    [data-testid="stSidebar"] [data-baseweb="tag"] {
        background: #202020;
        border: 1px solid #343434;
        border-radius: 6px;
        min-height: 24px;
        padding: 1px 6px;
        margin: 2px 4px 2px 0;
        color: var(--body);
    }

    [data-testid="stSidebar"] [data-baseweb="tag"] span {
        color: var(--body);
        font-size: 0.72rem;
        line-height: 1.1;
    }

    [data-testid="stSidebar"] [data-baseweb="tag"] svg {
        width: 12px;
        height: 12px;
    }

    [data-testid="stSidebar"] [role="slider"] {
        background: var(--accent-cyan) !important;
        border-color: var(--accent-cyan) !important;
    }

    [data-testid="stSidebar"] [data-testid="stSlider"] [data-baseweb="slider"] > div {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
    }

    [data-testid="stSidebar"] [data-testid="stSlider"] [data-baseweb="slider"] div {
        border-color: var(--accent-cyan) !important;
    }

    [data-testid="stSidebar"] [data-testid="stSlider"] div[style*="rgb(255, 75, 75)"],
    [data-testid="stSidebar"] [data-testid="stSlider"] div[style*="#ff4b4b"],
    [data-testid="stSidebar"] [data-testid="stSlider"] span[style*="rgb(255, 75, 75)"],
    [data-testid="stSidebar"] [data-testid="stSlider"] span[style*="#ff4b4b"] {
        background: var(--accent-cyan) !important;
        background-color: var(--accent-cyan) !important;
        border-color: var(--accent-cyan) !important;
        color: var(--canvas-deep) !important;
    }

    [data-testid="stSidebar"] [data-testid="stThumbValue"] {
        background: var(--accent-cyan) !important;
        color: var(--canvas-deep) !important;
        border-color: var(--accent-cyan) !important;
    }

    .sidebar-kicker {
        display: inline-flex;
        margin-bottom: 10px;
        border: 1px solid var(--hairline);
        border-radius: 9999px;
        background: var(--surface-elevated);
        color: var(--ink);
        font-family: "JetBrains Mono", Consolas, monospace;
        font-size: 0.72rem;
        padding: 5px 10px;
        text-transform: uppercase;
    }

    .sidebar-brand {
        color: var(--ink);
        font-size: 1.55rem;
        font-weight: 700;
        letter-spacing: 0;
        line-height: 1;
        margin: 0 0 20px;
    }

    .sidebar-brand span {
        color: var(--accent-cyan);
    }

    .sidebar-title {
        color: var(--ink);
        font-size: 1.7rem;
        font-weight: 650;
        line-height: 1.15;
        margin: 0 0 8px;
    }

    .sidebar-copy {
        color: var(--body);
        font-size: 0.92rem;
        line-height: 1.55;
        margin: 0 0 18px;
    }

    .hero-panel {
        position: relative;
        overflow: hidden;
        border: 1px solid var(--hairline-soft);
        border-radius: 16px;
        background:
            radial-gradient(circle at 50% 0%, rgba(0, 7, 205, 0.42), rgba(24, 24, 24, 0.06) 44%),
            var(--surface-card);
        padding: 34px;
        margin-bottom: 22px;
    }

    .hero-panel::after {
        content: "";
        position: absolute;
        inset: auto 28px 28px auto;
        width: 180px;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
        opacity: 0.8;
    }

    .badge-pill {
        display: inline-flex;
        align-items: center;
        border: 1px solid var(--hairline);
        border-radius: 9999px;
        background: var(--surface-elevated);
        color: var(--ink);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        padding: 5px 10px;
        text-transform: uppercase;
    }

    .hero-panel h1 {
        color: var(--ink);
        font-size: clamp(2.25rem, 5vw, 4.5rem);
        font-weight: 600;
        line-height: 1.05;
        letter-spacing: 0;
        margin: 18px 0 12px;
    }

    .hero-panel p {
        color: var(--body);
        font-size: 1.02rem;
        line-height: 1.6;
        max-width: 740px;
        margin: 0;
    }

    .terminal-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 14px;
        margin: 22px 0 16px;
        padding: 18px;
        border-radius: 16px;
        background: var(--canvas-deep);
        border: 1px solid var(--hairline-soft);
    }

    .metric-card {
        padding: 18px;
        border: 1px solid var(--hairline);
        border-radius: 12px;
        background: var(--surface-card);
        min-height: 116px;
    }

    .metric-card span {
        display: block;
        color: var(--body);
        font-family: "JetBrains Mono", Consolas, monospace;
        font-size: 0.78rem;
        margin-bottom: 0.55rem;
    }

    .metric-card strong {
        color: var(--ink);
        font-size: 1.7rem;
        line-height: 1.25;
    }

    .metric-card em {
        color: var(--accent-cyan);
        font-style: normal;
    }

    [data-testid="stVerticalBlockBorderWrapper"] {
        border-color: var(--hairline-soft);
        border-radius: 16px;
        background: var(--surface-card);
    }

    [data-testid="stTabs"] button {
        color: var(--body);
        border-radius: 8px 8px 0 0;
    }

    [data-testid="stTabs"] button[aria-selected="true"] {
        color: var(--ink);
    }

    [data-testid="stTabs"] [data-baseweb="tab-highlight"] {
        background: var(--primary);
    }

    [data-baseweb="select"] > div,
    [data-baseweb="input"] > div,
    [data-baseweb="tag"] {
        background: var(--surface-elevated);
        border-color: var(--hairline);
        border-radius: 8px;
    }

    div[data-testid="stLinkButton"] a {
        background: var(--surface-elevated);
        border: 1px solid var(--hairline);
        border-radius: 8px;
        color: var(--ink);
        font-weight: 600;
        min-height: 40px;
    }

    div[data-testid="stLinkButton"] a:hover {
        background: var(--primary);
        border-color: var(--primary-glow);
        color: var(--ink);
    }

    .contact-role {
        color: var(--muted);
        font-family: "JetBrains Mono", Consolas, monospace;
        font-size: 0.78rem;
        margin: 0 0 3px;
    }

    .contact-name {
        color: var(--ink);
        font-size: 1.08rem;
        font-weight: 600;
        line-height: 1.2;
        margin: 0 0 14px;
    }

    .stDataFrame,
    [data-testid="stDataFrame"] {
        border: 1px solid var(--hairline-soft);
        border-radius: 12px;
        overflow: hidden;
    }

    .summary-list {
        display: grid;
        gap: 10px;
        margin-top: 8px;
    }

    .summary-row {
        display: grid;
        grid-template-columns: 2rem 1fr 1.2fr;
        gap: 14px;
        align-items: center;
        padding: 14px 16px;
        border: 1px solid var(--hairline-soft);
        border-radius: 12px;
        background: var(--canvas-deep);
        color: var(--body);
        font-family: "JetBrains Mono", Consolas, monospace;
        font-size: 0.9rem;
    }

    .summary-row b {
        color: var(--accent-cyan);
        font-weight: 600;
    }

    .summary-row strong {
        color: var(--ink);
        font-weight: 500;
    }

    @media (max-width: 900px) {
        .terminal-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .summary-row {
            grid-template-columns: 1fr;
        }
    }
    </style>
    """,
    unsafe_allow_html=True,
)


def parse_skills(value):
    """Parse skill lists stored as stringified Python lists in the CSV."""
    if pd.isna(value):
        return []

    if isinstance(value, list):
        raw_skills = value
    else:
        text = str(value).strip()
        if not text:
            return []

        try:
            parsed = ast.literal_eval(text)
            raw_skills = parsed if isinstance(parsed, list) else [parsed]
        except (ValueError, SyntaxError):
            raw_skills = [part.strip() for part in text.split(",")]

    return [
        str(skill).strip().lower()
        for skill in raw_skills
        if str(skill).strip()
    ]


def format_category(category):
    category = str(category).strip()
    if category.lower() == "hr":
        return "HR"
    if category.lower() in {"it", "information technology"}:
        return "Information Technology"
    return category.title()


@st.cache_data(show_spinner=False)
def load_data(path):
    df = pd.read_csv(path)
    df["skills"] = df["job_skill_set"].apply(parse_skills)
    df["num_skills"] = df["skills"].apply(len)
    df["category_display"] = df["category"].apply(format_category)
    return df


def count_skills(rows):
    return Counter(skill for skills in rows["skills"] for skill in skills)


def style_chart(fig, ax):
    fig.patch.set_facecolor(CHART_BG)
    ax.set_facecolor(CHART_BG)
    ax.title.set_color(CHART_TEXT)
    ax.xaxis.label.set_color(CHART_MUTED)
    ax.yaxis.label.set_color(CHART_MUTED)
    ax.tick_params(colors=CHART_MUTED)
    ax.grid(color=CHART_GRID, alpha=0.38)

    for spine in ax.spines.values():
        spine.set_color(CHART_GRID)

    legend = ax.get_legend()
    if legend:
        legend.get_frame().set_facecolor("#222222")
        legend.get_frame().set_edgecolor(CHART_GRID)
        for text in legend.get_texts():
            text.set_color(CHART_TEXT)

    return fig


def make_barh(series, title, xlabel, ylabel, color):
    fig, ax = plt.subplots(figsize=(10, 6))
    series.plot(kind="barh", color=color, ax=ax)
    ax.set_xlabel(xlabel)
    ax.set_ylabel(ylabel)
    ax.set_title(title)
    ax.grid(axis="x", alpha=0.38)
    fig.tight_layout()
    return style_chart(fig, ax)


def make_skill_barh(skill_counts, title, color):
    labels = [skill for skill, _ in skill_counts]
    counts = [count for _, count in skill_counts]

    fig, ax = plt.subplots(figsize=(10, 6))
    ax.barh(labels, counts, color=color)
    ax.set_xlabel("Jumlah Lowongan")
    ax.set_ylabel("Skill")
    ax.set_title(title)
    ax.grid(axis="x", alpha=0.38)
    fig.tight_layout()
    return style_chart(fig, ax)


def make_histogram(df):
    mean_skills = df["num_skills"].mean()

    fig, ax = plt.subplots(figsize=(10, 6))
    ax.hist(
        df["num_skills"],
        bins=30,
        color="#7b3aed",
        edgecolor="#0f0f0f",
        alpha=0.92,
    )
    ax.set_xlabel("Jumlah Skill")
    ax.set_ylabel("Jumlah Pekerjaan")
    ax.set_title("Distribusi Jumlah Skill per Pekerjaan")
    ax.axvline(
        mean_skills,
        color="#00d4ff",
        linestyle="dashed",
        linewidth=2,
        label=f"Rata-rata: {mean_skills:.1f}",
    )
    ax.legend()
    ax.grid(axis="y", alpha=0.38)
    fig.tight_layout()
    return style_chart(fig, ax)


try:
    df = load_data(DATA_PATH)
except FileNotFoundError:
    st.error(f"File `{DATA_PATH}` tidak ditemukan.")
    st.stop()


with st.sidebar:
    st.markdown(
        """
        <div class="sidebar-brand">SkillMatch<span>.AI</span></div>
        <div class="sidebar-title">Filter Data</div>
        <p class="sidebar-copy">
            Pilih kategori dan jumlah skill teratas untuk memperbarui visualisasi.
        </p>
        """,
        unsafe_allow_html=True,
    )
    categories = sorted(df["category_display"].unique())

    with st.container(border=True):
        selected_categories = st.multiselect(
            "Kategori pekerjaan",
            options=categories,
            default=categories,
        )
        top_n = st.slider("Jumlah top skill", min_value=5, max_value=20, value=10)
        show_data = st.checkbox("Tampilkan sampel data", value=False)

    st.caption(f"Dataset aktif: `{DATA_PATH}`")


filtered_df = df[df["category_display"].isin(selected_categories)].copy()

if filtered_df.empty:
    st.warning("Tidak ada data untuk filter yang dipilih.")
    st.stop()


category_counts = filtered_df["category_display"].value_counts().sort_values()
jobtitle_counts = filtered_df["job_title"].value_counts()
skill_counts = count_skills(filtered_df).most_common()
all_skills = [skill for skills in filtered_df["skills"] for skill in skills]

hr_df = df[df["category"].str.lower() == "hr"]
it_df = df[df["category"].str.lower().isin(["information technology", "it"])]
skill_counts_hr = count_skills(hr_df).most_common(top_n)
skill_counts_it = count_skills(it_df).most_common(top_n)

top_category = category_counts.sort_values(ascending=False).index[0]
top_category_count = category_counts.sort_values(ascending=False).iloc[0]
top_jobtitle = jobtitle_counts.index[0]
top_jobtitle_count = jobtitle_counts.iloc[0]
top_skill = skill_counts[0][0] if skill_counts else "-"
top_skill_count = skill_counts[0][1] if skill_counts else 0

st.markdown(
    f"""
    <section class="hero-panel">
        <span class="badge-pill">Capstone EDA</span>
        <h1>Dashboard SkillMatch.AI</h1>
        <p>
        Dashboard ini membantu mengeksplorasi data lowongan kerja dan kebutuhan skill industri. isualisasi difokuskan pada kategori pekerjaan,
        distribusi skill, serta skill yang paling banyak dibutuhkan untuk membantu pengguna memahami
        peluang karier dan pengembangan skill yang relevan.
        </p>
    </section>
    """,
    unsafe_allow_html=True,
)

metrics = [
    ("total_jobs", f"{len(filtered_df):,}", "Total Lowongan"),
    ("unique_categories", f"{filtered_df['category_display'].nunique():,}", "Kategori Unik"),
    ("avg_skills", f"{filtered_df['num_skills'].mean():.2f}", "Rata-rata Skill"),
    ("unique_skills", f"{len(set(all_skills)):,}", "Total Skill Unik"),
]

with st.container(border=True):
    metric_columns = st.columns(4)
    for column, (code, value, label) in zip(metric_columns, metrics):
        with column:
            st.caption(f"`{code}`")
            st.metric(label=label, value=value)

tab_overview, tab_skills, tab_summary, tab_data = st.tabs(
    ["Kategori", "Skill", "Ringkasan", "Data"]
)

with tab_overview:
    left, right = st.columns(2)

    with left:
        with st.container(border=True):
            st.subheader("Insight Permintaan Kategori Pekerjaan")
            st.pyplot(
                make_barh(
                    category_counts,
                    "Jumlah Lowongan Berdasarkan Kategori",
                    "Jumlah Lowongan",
                    "Kategori Pekerjaan",
                    "#00d4ff",
                ),
                clear_figure=True,
            )

    with right:
        with st.container(border=True):
            st.subheader("Distribusi Skill pada Lowongan Kerja")
            st.pyplot(make_histogram(filtered_df), clear_figure=True)


with tab_skills:
    left, right = st.columns(2)

    with left:
        with st.container(border=True):
            st.subheader(f"{top_n} Skill HR Paling Dibutuhkan")
            if skill_counts_hr:
                st.pyplot(
                    make_skill_barh(
                        list(reversed(skill_counts_hr)),
                        f"{top_n} Skill Paling Banyak Diminta di Kategori HR",
                        "#ff6b7a",
                    ),
                    clear_figure=True,
                )
            else:
                st.info("Data skill HR tidak tersedia.")

    with right:
        with st.container(border=True):
            st.subheader(f"{top_n} Skill IT Paling Dibutuhkan")
            if skill_counts_it:
                st.pyplot(
                    make_skill_barh(
                        list(reversed(skill_counts_it)),
                        f"{top_n} Skill Paling Banyak Diminta di Kategori Information Technology",
                        "#00d4ff",
                    ),
                    clear_figure=True,
                )
            else:
                st.info("Data skill Information Technology tidak tersedia.")


with tab_summary:
    st.subheader("Ringkasan Akhir Eksplorasi Data")
    summary_rows = [
        ("Total lowongan dalam dataset", f"{len(filtered_df):,}"),
        ("Jumlah kategori pekerjaan unik", f"{filtered_df['category_display'].nunique():,}"),
        ("Kategori dengan lowongan terbanyak", f"{top_category} ({top_category_count:,} lowongan)"),
        ("Job title dengan lowongan terbanyak", f"{top_jobtitle} ({top_jobtitle_count:,} lowongan)"),
        ("Skill paling banyak diminta secara keseluruhan", f"{top_skill} ({top_skill_count:,} lowongan)"),
        ("Rata-rata jumlah skill per pekerjaan", f"{filtered_df['num_skills'].mean():.2f}"),
        ("Total skill unik dalam dataset", f"{len(set(all_skills)):,}"),
    ]

    if skill_counts_hr:
        summary_rows.append(
            (
                "Kategori HR memiliki skill terbanyak",
                f"{skill_counts_hr[0][0]} ({skill_counts_hr[0][1]:,} lowongan)",
            )
        )

    if skill_counts_it:
        summary_rows.append(
            (
                "Kategori IT memiliki skill terbanyak",
                f"{skill_counts_it[0][0]} ({skill_counts_it[0][1]:,} lowongan)",
            )
        )

    with st.container(border=True):
        for index, (indicator, result) in enumerate(summary_rows, start=1):
            number_col, indicator_col, result_col = st.columns([0.12, 0.48, 0.4])
            number_col.markdown(f"`{index:02d}`")
            indicator_col.write(indicator)
            result_col.markdown(f"**{result}**")


with tab_data:
    st.subheader("Sampel Dataset")
    if show_data:
        st.dataframe(
            filtered_df[
                ["job_id", "category_display", "job_title", "num_skills", "job_skill_set"]
            ].head(100),
            use_container_width=True,
            hide_index=True,
        )
    else:
        st.info("Aktifkan opsi `Tampilkan sampel data` di sidebar untuk melihat data.")


st.divider()
st.subheader("Tentang Proyek")
st.write(
    "SkillMatch.AI merupakan sistem rekomendasi karier dan pengembangan skill berbasis AI "
    "yang membantu pengguna mengidentifikasi pekerjaan sesuai kemampuan yang dimiliki. "
    "Dashboard ini menampilkan eksplorasi data lowongan kerja, kebutuhan skill industri, "
    "serta insight terkait skill yang paling relevan untuk meningkatkan kesiapan karier."
)

st.subheader("Tim Data Scientist")
contact_left, contact_right = st.columns(2)

for column, contact in zip([contact_left, contact_right], CONTACTS):
    with column:
        with st.container(border=True):
            st.markdown(
                f"""
                <p class="contact-role">{contact['role']}</p>
                <p class="contact-name">{contact['name']}</p>
                """,
                unsafe_allow_html=True,
            )
            linkedin_col, instagram_col = st.columns(2)
            linkedin_col.link_button(
                "LinkedIn",
                contact["linkedin"],
                use_container_width=True,
            )
            instagram_col.link_button(
                "Instagram",
                contact["instagram"],
                use_container_width=True,
            )

st.caption("Copyright (c) 2026 SkillMatch.AI All rights reserved.")
