# Hành Trình Văn Hóa – Khám phá văn hóa theo câu chuyện

**Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
**Loại sản phẩm:** Frontend Web (HTML / CSS / JavaScript) – nguyên mẫu nhiều vai trò, CRUD, responsive, AI mock  

---

## 1. Giới thiệu

Hành Trình Văn Hóa là nền tảng khám phá văn hóa địa phương theo câu chuyện. Người dùng có thể:

- Đọc câu chuyện gắn với địa điểm
- Tạo tuyến khám phá (Trail) cá nhân (có AI hỗ trợ)
- Nghệ nhân đăng nội dung & sự kiện
- Biên tập duyệt & xây collection
- Quản trị taxonomy, user, dashboard

## 2. Phân công nhóm (3 thành viên)

| Thành viên | Vai trò chính | Trang phụ trách | AI |
|------------|---------------|-----------------|----|
| **Quang** | Người khám phá | index, login, explorer-*, profile, 404 | AI-1 Trail Generator |
| **Sâm** | Nghệ nhân / Nhà sáng tạo | register, forgot-password, creator-*, notifications | AI-2 Story Summarizer |
| **Long** | Biên tập + Quản trị | curator-*, admin-*, 403, settings | AI-3 Tag Recommender |

Chi tiết xem `docs/team-assignment.md`.

## 3. Cách chạy

Không cần server backend. Mở trực tiếp file HTML hoặc dùng live server:

```bash
# Ví dụ với VS Code Live Server hoặc:
npx serve pages
```

Hoặc mở `pages/index.html` trong trình duyệt.

**Lưu ý:** Do dùng `fetch` local JSON, nên chạy qua HTTP server (không mở file:// trực tiếp) để tránh CORS.

## 4. Tài khoản demo

| Vai trò | Email | Mật khẩu |
|---------|-------|----------|
| Explorer | minhanh@example.com | bất kỳ |
| Creator | minh.nguyen@example.com | bất kỳ |
| Curator | mai.hoang@example.com | bất kỳ |
| Admin | admin@culturetrail.vn | bất kỳ |

## 5. Cấu trúc thư mục

```
culturetrail/
├── README.md
├── docs/
│   ├── team-assignment.md
│   ├── screen-list.md
│   └── ai-usage-report.md
├── pages/                 # Tất cả giao diện HTML
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── api.js             # Mock API + LocalStorage
│   ├── main.js
│   └── modules/
├── assets/
│   └── data/              # JSON giả lập
└── design/
```

## 6. Tính năng AI (mock Frontend)

1. **Trail Generator** (`explorer-my-trail.html`)  
   Nhập chủ đề/thời gian → loading → kết quả + giải thích → Chấp nhận / Sửa / Từ chối / Tạo lại

2. **Story Summarizer** (`explorer-story-detail.html`, `creator-story-form.html`)  
   Tóm tắt nội dung dài → có trạng thái thất bại & thao tác người dùng

3. **Tag Recommender** (`curator-collection-form.html`)  
   Gợi ý tag dựa trên tiêu đề/mô tả → áp dụng vào form

## 7. Dữ liệu

- File JSON trong `assets/data/`
- CRUD được mô phỏng bằng LocalStorage (sau lần load đầu)
- Có thể reset bằng `API.resetAll()` trong console

## 8. Git & minh chứng

- Nhánh: `feature/svX-<tên-màn-hình>`
- Mỗi trang cần: commit rõ nghĩa + PR + video OBS
- Xem quy trình trong file đề bài gốc

## 9. Trạng thái hiện tại

- ✅ Cấu trúc dự án + design system
- ✅ Mock data đầy đủ (stories, places, creators, events, collections, trails, users, tags)
- ✅ API mock + LocalStorage
- ✅ 28 trang HTML (đúng phân công, ≤ 30)
- ✅ Các trang chính đã có tương tác JS + AI mock đầy đủ luồng
- ⚠️ Một số trang phụ (event form, user management, tag management, content-map…) đang là khung – cần SV phụ trách hoàn thiện CRUD/trạng thái
- ⚠️ Cần bổ sung Figma/Canva + bảng kiểm kê cuối + video OBS

## 10. Việc còn lại theo từng SV

**SV1:** Hoàn thiện `explorer-trail-detail`, `profile`, trạng thái empty/loading trên các trang explorer, responsive kiểm thử.

**SV2:** Hoàn thiện `creator-profile`, `creator-event-*`, form validation chi tiết, notifications.

**SV3:** Hoàn thiện `admin-user-management`, `admin-tag-management`, `curator-content-map`, `curator-collection-management`, tích hợp navigation cuối + QA.

---

**Liên hệ nhóm / Repo gợi ý:** `cse122-culturetrail-teamXX`
