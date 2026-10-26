# Phân công công việc – CultureTrail

## Tổng quan

| SV | Vai trò chính | Số trang | AI phụ trách | Trách nhiệm chéo |
|----|---------------|----------|--------------|------------------|
| Quang | Người khám phá | 9 | AI-1 Trail Generator | Navigation + Responsive + A11y |
| Sâm | Nghệ nhân / Nhà sáng tạo | 9 | AI-2 Story Summarizer | JS modules + Dữ liệu + Validation |
| Long | Biên tập + Quản trị | 10 | AI-3 Tag Recommender | Tích hợp + QA + Phát hành |

**Tổng: 28 trang** (≤ 30)

---

## Quang – Người khám phá

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

## Sâm – Nghệ nhân / Nhà sáng tạo

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
- [x] HTML + CSS + Responsive
- [x] JS CRUD (LocalStorage) + form validation
- [x] AI-2 đầy đủ chuỗi + trạng thái thất bại
- [x] Quản lý dữ liệu giả lập chung
- [ ] Git + OBS

### Ghi chú hoàn thiện (SV2 – 24/10/2026)

- 9/9 trang chạy end-to-end với dữ liệu của `creator-001` (Minh Nguyễn); dữ liệu lọc theo creator đang đăng nhập.
- CRUD LocalStorage: câu chuyện (tạo / sửa / lưu trữ / khôi phục / gửi duyệt lại / xóa), sự kiện (tạo / sửa / hủy / xóa), hồ sơ nghệ nhân, thông báo (đánh dấu đã đọc / tất cả).
- Validation: đăng ký (trùng email, độ mạnh mật khẩu, xác nhận), form câu chuyện (giới hạn ký tự, tag ≤ 5, ảnh URL hợp lệ), form sự kiện (ngày kết thúc ≥ bắt đầu, sức chứa ≥ đã đăng ký), hồ sơ, quên mật khẩu.
- AI-2 Story Summarizer: nhập → loading → tóm tắt + giải thích → Chấp nhận / Chỉnh sửa / Từ chối / Tạo lại; có trạng thái thất bại + Thử lại / Tự viết.
- Trạng thái giao diện: loading, empty, error + retry, disabled, pending, rejected, completed, cancelled; dialog xác nhận cho thao tác nguy hiểm.
- Dữ liệu dùng chung: bổ sung `assets/data/notifications.json`, đồng bộ số liệu `creators.json`, thêm thông báo cho creator-001.
- Đã kiểm thử trên trình duyệt: desktop, menu mobile, responsive cơ bản; không có lỗi console.

---

## Long – Biên tập văn hóa + Quản trị viên

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
