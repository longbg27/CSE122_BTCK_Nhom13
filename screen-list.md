# Bảng kiểm kê màn hình – CultureTrail

> Được lập trước khi code chính thức. Cập nhật khi có thay đổi.

| Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD/Trạng thái | AI | Người phụ trách |
|---------|---------------------|---------------------|----------|-----|-----------------|----|-----------------|
| Chung | Vào hệ thống | Xem landing, điều hướng | Trang chủ | index.html | R | - | SV1 |
| Chung | Xác thực | Đăng nhập | Login | login.html | - | - | SV1 |
| Chung | Xác thực | Đăng ký | Register | register.html | C | - | SV2 |
| Chung | Khôi phục | Quên mật khẩu | Forgot Password | forgot-password.html | - | - | SV2 |
| Chung | Cá nhân | Xem/sửa hồ sơ | Profile | profile.html | R/U | - | SV1 |
| Chung | Cá nhân | Cài đặt | Settings | settings.html | R/U | - | SV3 |
| Chung | Thông báo | Xem thông báo | Notifications | notifications.html | R/U (đã đọc) | - | SV2 |
| Chung | Lỗi | 404 | 404 | 404.html | - | - | SV1 |
| Chung | Lỗi | 403 | 403 | 403.html | - | - | SV3 |
| Người khám phá | Khám phá | Tìm & lọc câu chuyện | Story Discovery | explorer-story-discovery.html | R | - | SV1 |
| Người khám phá | Tìm hiểu | Xem chi tiết câu chuyện | Story Detail | explorer-story-detail.html | R | AI-2 (xem) | SV1 |
| Người khám phá | Tìm hiểu | Xem địa điểm + câu chuyện gắn | Place Detail | explorer-place-detail.html | R + C (add trail) | - | SV1 |
| Người khám phá | Cá nhân hóa | Quản lý trail | My Trail | explorer-my-trail.html | C/R/U/D | **AI-1** | SV1 |
| Người khám phá | Cá nhân hóa | Xem chi tiết trail | Trail Detail | explorer-trail-detail.html | R/U | - | SV1 |
| Nghệ nhân | Quản lý | Xem tổng quan | Creator Dashboard | creator-dashboard.html | R | - | SV2 |
| Nghệ nhân | Xây dựng hồ sơ | Xem/sửa hồ sơ | Creator Profile | creator-profile.html | R/U | - | SV2 |
| Nghệ nhân | Tạo nội dung | Quản lý list câu chuyện | Story Management | creator-story-management.html | R/U/D + Archive | - | SV2 |
| Nghệ nhân | Tạo nội dung | Tạo/sửa câu chuyện | Story Form | creator-story-form.html | C/R/U | **AI-2** | SV2 |
| Nghệ nhân | Tổ chức | Quản lý sự kiện | Event Management | creator-event-management.html | C/R/U/D | - | SV2 |
| Nghệ nhân | Tổ chức | Tạo/sửa sự kiện | Event Form | creator-event-form.html | C/U | - | SV2 |
| Biên tập | Duyệt | Duyệt/từ chối nội dung | Content Review | curator-content-review.html | R + U (status) | - | SV3 |
| Biên tập | Xây collection | Quản lý collection | Collection Management | curator-collection-management.html | C/R/U | - | SV3 |
| Biên tập | Xây collection | Tạo/sửa collection | Collection Form | curator-collection-form.html | C/U | **AI-3** | SV3 |
| Biên tập | Tổ chức | Bản đồ nội dung / gắn tag | Content Map | curator-content-map.html | C/R/U/D | - | SV3 |
| Quản trị | Taxonomy | Quản lý tag | Tag Management | admin-tag-management.html | C/R/U/D | - | SV3 |
| Quản trị | User | Quản lý người dùng | User Management | admin-user-management.html | C/R/U | - | SV3 |
| Quản trị | Giám sát | Dashboard tổng | Culture Dashboard | admin-culture-dashboard.html | R | - | SV3 |
| Quản trị | Cấu hình | Cài đặt hệ thống | Admin Settings | admin-settings.html | R/U | - | SV3 |

**Tổng số màn hình: 28**

---

## Ghi chú hoàn thiện – SV2 (24/10/2026)

9 màn hình của SV2 đã hoàn thiện end-to-end, dùng chung `js/api.js` + LocalStorage và dữ liệu của creator đang đăng nhập:

| Tệp | Đã có |
|-----|-------|
| `register.html` | Validation, kiểm tra trùng email, tạo user + hồ sơ creator, chuyển hướng theo vai trò |
| `forgot-password.html` | Validation, gửi mô phỏng, thành công, cooldown 30s, lỗi mạng + thử lại |
| `creator-dashboard.html` | Thống kê theo creator, câu chuyện gần đây, sự kiện sắp tới, empty/loading/error |
| `creator-profile.html` | Xem/sửa hồ sơ, validation, đồng bộ header + session |
| `creator-story-management.html` | Tab trạng thái, tìm kiếm, sắp xếp, lưu trữ / khôi phục / gửi duyệt lại / xóa |
| `creator-story-form.html` | Tạo/sửa, validation, giữ trạng thái khi sửa, **AI-2** đủ chuỗi + thất bại |
| `creator-event-management.html` | Tab trạng thái, tìm kiếm, sắp xếp, hủy / xóa, tiến độ sức chứa |
| `creator-event-form.html` | Tạo/sửa, validation ngày + sức chứa, trạng thái sự kiện |
| `notifications.html` | Tab tất cả / chưa đọc / đã đọc, đánh dấu đã đọc, đánh dấu tất cả, badge header |

**Trạng thái chung:** loading, empty, error + retry, disabled, pending, rejected, completed, cancelled; dialog xác nhận; responsive + accessibility.
