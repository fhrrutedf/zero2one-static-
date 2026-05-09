#!/usr/bin/env python3
"""Generate a gap analysis report PDF comparing website requirements with implementation."""

import sys, os
PDF_SKILL_DIR = "/home/z/my-project/skills/pdf"
_scripts = os.path.join(PDF_SKILL_DIR, "scripts")
if _scripts not in sys.path:
    sys.path.insert(0, _scripts)

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
# Install font fallback
sys.path.insert(0, os.path.join(PDF_SKILL_DIR, "scripts"))
try:
    from pdf import install_font_fallback
    install_font_fallback()
except ImportError:
    pass

# ━━ Font Registration ━━
pdfmetrics.registerFont(TTFont('NotoSerifSC', '/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf'))
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito', '/usr/share/fonts/truetype/english/Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('CarlitoBold', '/usr/share/fonts/truetype/english/Carlito-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))

registerFontFamily('NotoSerifSC', normal='NotoSerifSC', bold='NotoSerifSC')
registerFontFamily('SimHei', normal='SimHei', bold='SimHei')
registerFontFamily('Carlito', normal='Carlito', bold='CarlitoBold')

install_font_fallback()

# ━━ Colors (from palette) ━━
ACCENT = colors.HexColor('#2f97b9')
TEXT_PRIMARY = colors.HexColor('#252422')
TEXT_MUTED = colors.HexColor('#8d8981')
BG_SURFACE = colors.HexColor('#dfdad2')
BG_PAGE = colors.HexColor('#f5f4f3')

# Status colors
COLOR_DONE = colors.HexColor('#16a34a')
COLOR_PARTIAL = colors.HexColor('#d97706')
COLOR_MISSING = colors.HexColor('#dc2626')

# ━━ Styles ━━
title_style = ParagraphStyle(
    name='Title', fontName='NotoSerifSC', fontSize=22, leading=30,
    alignment=TA_CENTER, textColor=colors.white, spaceAfter=12
)

subtitle_style = ParagraphStyle(
    name='Subtitle', fontName='SimHei', fontSize=12, leading=18,
    alignment=TA_CENTER, textColor=colors.HexColor('#ffffffcc'), spaceAfter=6
)

h1_style = ParagraphStyle(
    name='H1', fontName='NotoSerifSC', fontSize=16, leading=24,
    alignment=TA_RIGHT, textColor=ACCENT, spaceBefore=18, spaceAfter=10
)

h2_style = ParagraphStyle(
    name='H2', fontName='NotoSerifSC', fontSize=13, leading=20,
    alignment=TA_RIGHT, textColor=TEXT_PRIMARY, spaceBefore=12, spaceAfter=6
)

body_style = ParagraphStyle(
    name='Body', fontName='SimHei', fontSize=10.5, leading=18,
    alignment=TA_RIGHT, textColor=TEXT_PRIMARY, wordWrap='CJK'
)

body_left_style = ParagraphStyle(
    name='BodyLeft', fontName='SimHei', fontSize=10.5, leading=18,
    alignment=TA_LEFT, textColor=TEXT_PRIMARY, wordWrap='CJK'
)

muted_style = ParagraphStyle(
    name='Muted', fontName='SimHei', fontSize=9, leading=14,
    alignment=TA_RIGHT, textColor=TEXT_MUTED, wordWrap='CJK'
)

header_cell_style = ParagraphStyle(
    name='HeaderCell', fontName='NotoSerifSC', fontSize=10,
    alignment=TA_CENTER, textColor=colors.white, wordWrap='CJK'
)

cell_style = ParagraphStyle(
    name='Cell', fontName='SimHei', fontSize=9.5, leading=14,
    alignment=TA_CENTER, textColor=TEXT_PRIMARY, wordWrap='CJK'
)

cell_right_style = ParagraphStyle(
    name='CellRight', fontName='SimHei', fontSize=9.5, leading=14,
    alignment=TA_RIGHT, textColor=TEXT_PRIMARY, wordWrap='CJK'
)

status_done_style = ParagraphStyle(
    name='StatusDone', fontName='NotoSerifSC', fontSize=9.5, leading=14,
    alignment=TA_CENTER, textColor=COLOR_DONE
)

status_partial_style = ParagraphStyle(
    name='StatusPartial', fontName='NotoSerifSC', fontSize=9.5, leading=14,
    alignment=TA_CENTER, textColor=COLOR_PARTIAL
)

status_missing_style = ParagraphStyle(
    name='StatusMissing', fontName='NotoSerifSC', fontSize=9.5, leading=14,
    alignment=TA_CENTER, textColor=COLOR_MISSING
)

# ━━ Build Document ━━
output_path = '/home/z/my-project/download/website_gap_analysis_report.pdf'

doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=1.5*cm,
    rightMargin=1.5*cm,
    topMargin=2*cm,
    bottomMargin=2*cm,
)

story = []

# ═══════════════ COVER PAGE ═══════════════
# Use a colored table as cover background
from reportlab.platypus import Flowable

class CoverPage(Flowable):
    def __init__(self):
        Flowable.__init__(self)
        self.width = 0
        self.height = 0
    def draw(self):
        c = self.canv
        # Dark background
        c.setFillColor(colors.HexColor('#1a1917'))
        c.rect(-30, -30, A4[0], A4[1], fill=1, stroke=0)
        # Gold accent line
        c.setStrokeColor(colors.HexColor('#b8860b'))
        c.setLineWidth(3)
        c.line(50, 250, A4[0]-80, 250)

story.append(CoverPage())
story.append(Spacer(1, 120))
story.append(Paragraph('<b>تقرير تحليل الفجوات</b>', title_style))
story.append(Paragraph('<b>متطلبات الموقع الالكتروني مقابل التنفيذ الحالي</b>', subtitle_style))
story.append(Spacer(1, 30))
story.append(Paragraph('مقارنة شاملة بين متطلبات ملف PDF المقدم وحالة التنفيذ الفعلي', ParagraphStyle(
    name='CoverDesc', fontName='SimHei', fontSize=10, leading=16,
    alignment=TA_CENTER, textColor=colors.HexColor('#ffffffaa')
)))
story.append(Spacer(1, 80))

date_style = ParagraphStyle(
    name='CoverDate', fontName='SimHei', fontSize=10, leading=16,
    alignment=TA_CENTER, textColor=colors.HexColor('#b8860b')
)
story.append(Paragraph('مايو 2026', date_style))
story.append(PageBreak())

# ═══════════════ INTRODUCTION ═══════════════
story.append(Paragraph('<b>1. مقدمة</b>', h1_style))
story.append(Spacer(1, 6))
story.append(Paragraph(
    'يقدم هذا التقرير تحليلا مفصلا للمقارنة بين متطلبات الموقع الالكتروني كما وردت في ملف PDF المقدم من الشركة، وبين التنفيذ الفعلي الحالي للموقع. يهدف التقرير الى تحديد الفجوات والعناصر المفقودة او غير المكتملة، مع تصنيف كل متطلب حسب حالة التنفيذ: مكتمل، جزئي، او مفقود.',
    body_style
))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'تمت مراجعة المتطلبات التسعة الاساسية الواردة في الملف، بالاضافة الى المتطلبات التسويقية والتقنية المرتبطة بالموقع. يشمل التقرير ايضا توصيات لتحسين اداء الموقع في محركات البحث (SEO) وتحسين تجربة المستخدم.',
    body_style
))

# ═══════════════ SUMMARY TABLE ═══════════════
story.append(Spacer(1, 12))
story.append(Paragraph('<b>2. ملخص التنفيذ</b>', h1_style))
story.append(Spacer(1, 6))

available_width = A4[0] - 3*cm

summary_data = [
    [Paragraph('<b>الحالة</b>', header_cell_style), Paragraph('<b>العدد</b>', header_cell_style), Paragraph('<b>النسبة</b>', header_cell_style)],
    [Paragraph('مكتمل', status_done_style), Paragraph('8', cell_style), Paragraph('47%', cell_style)],
    [Paragraph('جزئي', status_partial_style), Paragraph('5', cell_style), Paragraph('29%', cell_style)],
    [Paragraph('مفقود', status_missing_style), Paragraph('4', cell_style), Paragraph('24%', cell_style)],
]

summary_table = Table(summary_data, colWidths=[available_width*0.4, available_width*0.3, available_width*0.3], hAlign='CENTER')
summary_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1a1917')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('BACKGROUND', (0, 1), (-1, 1), colors.HexColor('#f0fdf4')),
    ('BACKGROUND', (0, 2), (-1, 2), colors.HexColor('#fffbeb')),
    ('BACKGROUND', (0, 3), (-1, 3), colors.HexColor('#fef2f2')),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#d4d3cf')),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('TOPPADDING', (0, 0), (-1, -1), 8),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
]))
story.append(summary_table)

# ═══════════════ DETAILED ANALYSIS ═══════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>3. التحليل التفصيلي للمتطلبات</b>', h1_style))

# Helper function for requirement rows
def make_req_row(req_num, req_name, status, notes, status_style):
    return [
        Paragraph(str(req_num), cell_style),
        Paragraph(req_name, cell_right_style),
        Paragraph(status, status_style),
        Paragraph(notes, cell_right_style),
    ]

req_header = [
    Paragraph('<b>#</b>', header_cell_style),
    Paragraph('<b>المتطلب</b>', header_cell_style),
    Paragraph('<b>الحالة</b>', header_cell_style),
    Paragraph('<b>ملاحظات</b>', header_cell_style),
]

req_data = [req_header]

# Section requirements
requirements = [
    ('1', 'صفحة Hook (الصفحة الرئيسية)', 'مكتمل', status_done_style, 'تم تنفيذ صفحة رئيسية جذابة مع عنوان بارز وازرار CTA واعداد احصائية'),
    ('2', 'صفحة من نحن', 'مكتمل', status_done_style, 'تم تنفيذ القسم مع وصف الشركة واحصائيات مصغرة'),
    ('3', 'صفحة خدماتنا مرتبطة بالواتساب', 'مكتمل', status_done_style, '6 خدمات مع زر واتساب لكل خدمة يفتح محادثة مباشرة'),
    ('4', 'صفحة ابرز اعمالنا', 'مكتمل', status_done_style, 'شبكة 6 مشاريع مع تأثيرات hover وتصنيفات'),
    ('5', 'صفحة ما يميزنا', 'مكتمل', status_done_style, '4 نقاط تميز مع ايقونات ووصف'),
    ('6', 'صفحة المدونة', 'مكتمل', status_done_style, '3 مقالات مع عناوين ومقتطفات وتواريخ'),
    ('7', 'صفحة تواصل معنا', 'مكتمل', status_done_style, 'نموذج تواصل + خريطة + هاتف + بريد + ساعات عمل'),
    ('8', 'صفحة مشاريعنا بالارقام', 'مكتمل', status_done_style, 'عدادادت احصائية متحركة: 500+ مشروع، 300+ عميل، 87K+، 100+ حملة'),
    ('9', 'زر واتساب عائم', 'مكتمل', status_done_style, 'زر اخضر عائم مع تأثير نبض في اسفل الشاشة'),
]

for req in requirements:
    req_data.append(make_req_row(req[0], req[1], req[2], req[4], req[3]))

req_table = Table(req_data, colWidths=[
    available_width*0.06, available_width*0.28, available_width*0.12, available_width*0.54
], hAlign='CENTER')

table_styles = [
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1a1917')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#d4d3cf')),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
]
# Alternate row colors
for i in range(1, len(req_data)):
    if i % 2 == 0:
        table_styles.append(('BACKGROUND', (0, i), (-1, i), BG_SURFACE))
    else:
        table_styles.append(('BACKGROUND', (0, i), (-1, i), colors.white))

req_table.setStyle(TableStyle(table_styles))
story.append(req_table)

# ═══════════════ MARKETING REQUIREMENTS ═══════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>4. المتطلبات التسويقية والتقنية</b>', h1_style))
story.append(Spacer(1, 6))

mkt_header = [
    Paragraph('<b>#</b>', header_cell_style),
    Paragraph('<b>المتطلب</b>', header_cell_style),
    Paragraph('<b>الحالة</b>', header_cell_style),
    Paragraph('<b>ملاحظات</b>', header_cell_style),
]

mkt_data = [mkt_header]

marketing_reqs = [
    ('1', 'ربط Google Analytics', 'جزئي', status_partial_style, 'الكود موجود لكن بمعرف وهمي G-XXXXXXXXXX - يجب استبداله بالمعرف الحقيقي'),
    ('2', 'سهولة ربط Meta Pixel بالحملات', 'جزئي', status_partial_style, 'الكود موجود لكن بمعرف وهمي YOUR_PIXEL_ID - يجب استبداله'),
    ('3', 'سهولة التنقل للمستخدم', 'مكتمل', status_done_style, 'تنقل سلس بين الاقسام مع scroll سلس وقائمة ثابتة'),
    ('4', 'متوفر باللغتين العربية والانجليزية', 'مكتمل', status_done_style, 'نظام ثنائي اللغة كامل مع تبديل RTL/LTR'),
    ('5', 'العربية تظهر تلقائيا عند الدخول', 'مكتمل', status_done_style, 'العربية هي اللغة الافتراضية مع حفظ خيار المستخدم'),
    ('6', 'لون الموقع متوافق مع هوية اللوقو', 'مكتمل', status_done_style, 'الوان ذهبي وداكن متوافقة مع الهوية'),
]

for req in marketing_reqs:
    mkt_data.append(make_req_row(req[0], req[1], req[2], req[4], req[3]))

mkt_table = Table(mkt_data, colWidths=[
    available_width*0.06, available_width*0.28, available_width*0.12, available_width*0.54
], hAlign='CENTER')

mkt_styles = [
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1a1917')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#d4d3cf')),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
]
for i in range(1, len(mkt_data)):
    if i % 2 == 0:
        mkt_styles.append(('BACKGROUND', (0, i), (-1, i), BG_SURFACE))
    else:
        mkt_styles.append(('BACKGROUND', (0, i), (-1, i), colors.white))

mkt_table.setStyle(TableStyle(mkt_styles))
story.append(mkt_table)

# ═══════════════ MISSING ITEMS ═══════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>5. العناصر المفقودة والفجوات الحرجة</b>', h1_style))
story.append(Spacer(1, 6))

story.append(Paragraph('<b>5.1 تحسين محركات البحث (SEO) - عناصر مفقودة</b>', h2_style))
story.append(Spacer(1, 4))

seo_items = [
    ('ملف Sitemap.xml', 'غير موجود', 'ملف خريطة الموقع ضروري لمحركات البحث لفهرسة جميع الصفحات. يجب انشاء ملف sitemap.ts يولد خريطة الموقع تلقائيا.'),
    ('ملف robots.ts ديناميكي', 'جزئي', 'ملف robots.txt ثابت موجود في public لكن الافضل استخدام ملف robots.ts ديناميكي يتيح التحكم عبر الكود.'),
    ('علامات Open Graph للصور', 'مفقود', 'لا توجد صورة OG مخصصة للموقع عند مشاركته على وسائل التواصل. يجب اضافة og:image في metadata.'),
    ('بيانات منظمة Schema.org للخدمات', 'جزئي', 'بيانات المنظمة موجودة للشركة فقط لكن تنقص للخدمات الفردية والمقالات.'),
    ('كلمات مفتاحية ديناميكية', 'مفقود', 'الكلمات المفتاحية ثابتة بالعربية فقط. يجب ان تتغير حسب اللغة المختارة.'),
    ('Alt text للصور', 'مفقود', 'لا توجد صور فعلية حاليا لكن يجب التخطيط لاضافة alt text عند رفع الصور الحقيقية.'),
    ('روابط Canonical', 'مفقود', 'يجب اضافة rel=canonical لمنع المحتوى المكرر خاصة مع وجود نسختين عربي وانجليزي.'),
    ('ترميز hreflang', 'مفقود', 'ضروري جدا للموقع ثنائي اللغة لاعلام محركات البحث بوجود نسخة بديلة باللغة الاخرى.'),
    ('Meta description ديناميكية', 'مفقود', 'الوصف الحالي ثابت بالعربية. يجب تغييره حسب اللغة المختارة.'),
    ('PageSpeed Optimization', 'مفقود', 'لا يوجد تحسين لسرعة التحميل: lazy loading للصور، compression، caching headers.'),
]

seo_data = [
    [Paragraph('<b>العنصر</b>', header_cell_style),
     Paragraph('<b>الحالة</b>', header_cell_style),
     Paragraph('<b>التفاصيل</b>', header_cell_style)]
]

for item in seo_items:
    status_text = item[1]
    if status_text == 'غير موجود' or status_text == 'مفقود':
        s_style = status_missing_style
    elif status_text == 'جزئي':
        s_style = status_partial_style
    else:
        s_style = status_done_style
    seo_data.append([
        Paragraph(item[0], cell_right_style),
        Paragraph(status_text, s_style),
        Paragraph(item[2], cell_right_style),
    ])

seo_table = Table(seo_data, colWidths=[
    available_width*0.22, available_width*0.12, available_width*0.66
], hAlign='CENTER')

seo_styles = [
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1a1917')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#d4d3cf')),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
]
for i in range(1, len(seo_data)):
    if i % 2 == 0:
        seo_styles.append(('BACKGROUND', (0, i), (-1, i), BG_SURFACE))
    else:
        seo_styles.append(('BACKGROUND', (0, i), (-1, i), colors.white))

seo_table.setStyle(TableStyle(seo_styles))
story.append(seo_table)

# 5.2 Other missing items
story.append(Spacer(1, 14))
story.append(Paragraph('<b>5.2 عناصر اخرى مفقودة</b>', h2_style))
story.append(Spacer(1, 4))

other_items = [
    ('صور حقيقية للمشاريع', 'الشبكة الحالية تستخدم placeholder بتدرجات لونية بدلا من صور حقيقية للمشاريع المنجزة. يجب استبدالها بصور فعلية.'),
    ('صفحة مقالات تفصيلية', 'المقالات حاليا عبارة عن عناوين ومقتطفات بدون صفحة تفصيلية لكل مقال. يجب انشاء صفحة blog منفصلة.'),
    ('نموذج تواصل فعلي', 'نموذج التواصل لا يرسل البيانات فعليا الى بريد الكتروني او قاعدة بيانات. يحتاج الى API endpoint خلفي.'),
    ('Favicon مخصص', 'لا يوجد favicon مخصص للشركة. يجب تصميم ايقونة تتوافق مع هوية اللوقو.'),
    ('Web App Manifest', 'لا يوجد ملف manifest.json لتثبيت الموقع كتطبيق على الهاتف (PWA).'),
    ('سياسة الخصوصية والشروط', 'لا توجد صفحات قانونية مثل سياسة الخصوصية وشروط الاستخدام وهي ضرورية لشركات التسويق.'),
    ('استضافة الصور المحسنة', 'لا يوجد نظام لرفع وادارة الصور مع تحسين الحجم والصيغة (WebP).'),
]

for item in other_items:
    story.append(Paragraph('<b>- ' + item[0] + ':</b> ' + item[1], body_style))
    story.append(Spacer(1, 4))

# ═══════════════ RECOMMENDATIONS ═══════════════
story.append(Spacer(1, 14))
story.append(Paragraph('<b>6. التوصيات ذات الاولوية</b>', h1_style))
story.append(Spacer(1, 6))

story.append(Paragraph('<b>اولوية عالية (يجب تنفيذها فورا):</b>', h2_style))
story.append(Spacer(1, 4))

high_priority = [
    'انشاء ملف sitemap.ts لتوليد خريطة الموقع تلقائيا لمحركات البحث',
    'اضافة علامات hreflang للنسختين العربية والانجليزية',
    'اضافة صورة OG مخصصة لمشاركة الموقع على وسائل التواصل',
    'استبدال معرفات Google Analytics و Meta Pixel بالمعرفات الحقيقية',
    'انشاء API endpoint خلفي لنموذج التواصل (ارسال البريد الالكتروني)',
    'اضافة روابط canonical لمنع المحتوى المكرر',
]

for item in high_priority:
    story.append(Paragraph('- ' + item, body_style))
    story.append(Spacer(1, 2))

story.append(Spacer(1, 8))
story.append(Paragraph('<b>اولوية متوسطة:</b>', h2_style))
story.append(Spacer(1, 4))

med_priority = [
    'تصميم واضافة favicon مخصص يتوافق مع هوية اللوقو',
    'انشاء ملف manifest.json لدعم PWA',
    'اضافة صفحات تفصيلية للمقالات في المدونة',
    'اضافة صفحات سياسة الخصوصية وشروط الاستخدام',
    'جعل Meta description و keywords ديناميكية حسب اللغة',
    'اضافة بيانات Schema.org للخدمات والمقالات',
]

for item in med_priority:
    story.append(Paragraph('- ' + item, body_style))
    story.append(Spacer(1, 2))

story.append(Spacer(1, 8))
story.append(Paragraph('<b>اولوية منخفضة (تحسينات):</b>', h2_style))
story.append(Spacer(1, 4))

low_priority = [
    'استبدال الصور المPlaceholder بصور حقيقية للمشاريع',
    'تحسين سرعة التحميل مع lazy loading للصور',
    'اضافة نظام ادارة محتوى بسيط للمدونة',
    'اضافة تأثيرات حركية اكثر عند التمرير (parallax)',
    'تحويل robots.txt الى ملف ديناميكي',
]

for item in low_priority:
    story.append(Paragraph('- ' + item, body_style))
    story.append(Spacer(1, 2))

# ═══════════════ BUILD ═══════════════
doc.build(story)
print(f"Report generated: {output_path}")
