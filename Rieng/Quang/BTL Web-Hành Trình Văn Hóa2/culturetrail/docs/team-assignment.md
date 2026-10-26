# Phân công công việc – Hành Trình Văn Hóa

## Tổng quan

| SV | Vai trò chính | Số trang | AI phụ trách | Trách nhiệm chéo |
|----|---------------|----------|--------------|------------------|
| SV1 | Người khám phá | 9 | AI-1 Trail Generator | Navigation + Responsive + A11y |
| SV2 | Nghệ nhân / Nhà sáng tạo | 9 | AI-2 Story Summarizer | JS modules + Dữ liệu + Validation |
| SV3 | Biên tập + Quản trị | 10 | AI-3 Tag Recommender | Tích hợp + QA + Phát hành |

**Tổng: 28 trang** (≤ 30)

---

## SV1 – Người khám phá

### Trang phụ trách
1. `index.html` – Trang chủ
2. `login.html` – Đăng nhập
3. `explorer-story-discovery.html` – Khám phá + filter/search
4. `explorer-place-detail.html` – Chi tiết địa điểm
5. `explorer-story-detail.html` – Chi tiết câu chuyện + AI Summarizer (xem)
6. `explorer-my-trail.html` – Trail cá nhân + **AI Trail Generator**
7. `explorer-trail-detail.html` – Chi tiết trail
8. `profile.html` – Hồ sơ cá nhân
9. `404.html` – Trang lỗi

### Việc cần hoàn thành end-to-end
- [ ] Figma/Canva cho các màn hình trên
- [ ] HTML semantic + CSS hoàn chỉnh
- [ ] Responsive (mobile + tablet)
- [ ] JS: search, filter, sort, thêm vào trail
- [ ] AI-1 đầy đủ chuỗi (nhập → loading → kết quả → giải thích → chấp nhận/sửa/từ chối)
- [ ] Trạng thái: loading, empty, error
- [ ] Git branch + commit + PR + OBS video từng trang

---

## SV2 – Nghệ nhân / Nhà sáng tạo

### Trang phụ trách
1. `register.html` – Đăng ký
2. `forgot-password.html` – Quên mật khẩu
3. `creator-dashboard.html` – Dashboard cá nhân
4. `creator-profile.html` – Hồ sơ nghệ nhân
5. `creator-story-management.html` – Quản lý câu chuyện (list)
6. `creator-story-form.html` – Form tạo/sửa + **AI Story Summarizer**
7. `creator-event-management.html` – Quản lý sự kiện
8. `creator-event-form.html` – Form sự kiện
9. `notifications.html` – Thông báo

### Việc cần hoàn thành end-to-end
- [ ] Figma/Canva
- [ ] HTML + CSS + Responsive
- [ ] JS CRUD (LocalStorage) + form validation
- [ ] AI-2 đầy đủ chuỗi + trạng thái thất bại
- [ ] Quản lý dữ liệu giả lập chung
- [ ] Git + OBS

---

## SV3 – Biên tập văn hóa + Quản trị viên

### Trang phụ trách
1. `curator-content-review.html` – Duyệt nội dung
2. `curator-collection-management.html` – Quản lý collection
3. `curator-collection-form.html` – Form collection + **AI Tag Recommender**
4. `curator-content-map.html` – Bản đồ nội dung
5. `admin-tag-management.html` – Quản lý tag/taxonomy
6. `admin-user-management.html` – Quản lý người dùng
7. `admin-culture-dashboard.html` – Dashboard tổng
8. `admin-settings.html` – Cài đặt hệ thống
9. `403.html` – Không có quyền
10. `settings.html` – Cài đặt cá nhân

### Việc cần hoàn thành end-to-end
- [ ] Figma/Canva
- [ ] HTML + CSS + Responsive
- [ ] JS duyệt/từ chối, CRUD collection/tag/user
- [ ] AI-3 đầy đủ chuỗi
- [ ] Tích hợp navigation + kiểm thử toàn site
- [ ] Merge dev → main + QA cuối
- [ ] Git + OBS

---

## Trách nhiệm chéo bắt buộc

| Hạng mục | Chính | Hỗ trợ |
|----------|-------|--------|
| Design system / Header-Footer / Nav | SV1 | SV3 |
| JS modules / API / LocalStorage / AI mock | SV2 | SV1, SV3 |
| Responsive + QA + Phát hành | SV3 | SV1, SV2 |

---

## Quy trình Git bắt buộc

```
Trello task → tạo nhánh feature/svX-... → code → commit (conventional) → push → PR → review chéo → merge dev → OBS
```

Commit mẫu:
- `feat: add trail generator AI panel`
- `fix: validate empty story form`
- `style: improve mobile filter bar`
- `docs: update screen list`
