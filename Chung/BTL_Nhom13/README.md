# Hành Trình Văn Hóa (CultureTrail)

Website prototype quản lý & khám phá di sản văn hóa Việt Nam — bài tập lớn nhóm (CSE122).

## Thành viên & phân công

| SV | Vai trò | Trang chính |
|----|---------|-------------|
| **Quang** | Người khám phá | `index`, `login`, `profile`, `404`, explorer-* (+ AI Trail Generator) |
| **Sâm** | Nghệ nhân / Nhà sáng tạo | `register`, `forgot-password`, `notifications`, creator-* (+ AI Story Summarizer) |
| **Long** | Biên tập + Quản trị | `403`, `setting`, curator-*, ad-* (+ AI Tag Recommender) |

## Chạy project

```bash
# Từ thư mục culturetrail/
npx serve .
# hoặc VS Code Live Server mở pages/index.html
```

**Lưu ý:** Cần HTTP server (không mở `file://`) để fetch JSON trong `assets/data/`.

## Tài khoản demo

| Email | Vai trò |
|-------|---------|
| minhanh@example.com | explorer |
| minh.nguyen@example.com | creator |
| mai.hoang@example.com | curator |
| admin@culturetrail.vn | admin |

Mật khẩu demo: bất kỳ (mock auth).

## Cấu trúc

```
culturetrail/
├── index.html          # redirect → pages/index.html
├── pages/              # toàn bộ màn hình
├── css/                # style.css, responsive.css
├── js/                 # api.js (mock + LocalStorage), main.js
├── assets/data/        # seed JSON
├── assets/images/      # ảnh minh họa
└── docs/               # phân công, screen-list, AI report
```

## Gộp từ 3 zip thành viên

- Quang: trang Explorer + ảnh  
- Sâm: trang Creator + API/CSS/data đầy đủ  
- Long: trang Curator/Admin (tên file tiếng Việt `ad-*`, `curator-*`; kèm bản alias tên tiếng Anh)

## AI (mock rule-based)

1. **AI-1** Trail Generator — `explorer-my-trail.html`  
2. **AI-2** Story Summarizer — `creator-story-form.html`  
3. **AI-3** Tag Recommender — `curator-thuthap-bosuutap.html` (alias: `curator-collection-form.html`)
