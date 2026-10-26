# Báo cáo sử dụng AI – Hành Trình Văn Hóa

## 1. Công cụ AI đã dùng trong quá trình phát triển

- Grok (xAI) – hỗ trợ phân tích đề bài, phân công, viết code khung, mock AI features
- (Có thể bổ sung ChatGPT / Claude / Copilot nếu nhóm dùng thêm)

## 2. Các tính năng AI trong sản phẩm (mock Frontend)

### AI-1: Trail Generator
- **Vị trí:** explorer-my-trail.html
- **Luồng:** Nhập chủ đề + thời gian + khu vực → Đang xử lý → Kết quả (danh sách điểm dừng) + lý do → Chấp nhận / Sửa / Từ chối / Tạo lại
- **Cách mô phỏng:** JavaScript + dữ liệu places/stories JSON, delay giả lập, random failure ~12%
- **Trạng thái thất bại:** “Không đủ dữ liệu…” + nút Thử lại / Tạo thủ công

### AI-2: Story Summarizer
- **Vị trí:** explorer-story-detail.html và creator-story-form.html
- **Luồng:** Nhấn nút / lấy nội dung → Loading → Bản tóm tắt + lý do → Chấp nhận / Chỉnh sửa / Từ chối / Tạo lại
- **Cách mô phỏng:** Cắt/ghép nội dung + delay, random failure ~15%
- **Trạng thái thất bại:** Có nút Thử lại / Bỏ qua

### AI-3: Tag Recommender
- **Vị trí:** curator-collection-form.html
- **Luồng:** Nhập tiêu đề/mô tả → Loading → Danh sách tag gợi ý + lý do → Áp dụng / Tạo lại / Từ chối
- **Cách mô phỏng:** So khớp từ khóa với tags.json + random, failure khi thiếu dữ liệu
- **Trạng thái thất bại:** Có thông báo + Thử lại

## 3. Phần AI sinh ra vs phần sinh viên chỉnh sửa

| Phần | AI hỗ trợ | Sinh viên chỉnh sửa / kiểm chứng |
|------|-----------|----------------------------------|
| Phân công & bảng màn hình | Có | Rà soát theo đề, điều chỉnh số trang ≤30 |
| Design system CSS | Có khung | Tinh chỉnh màu, spacing, responsive |
| Mock API + LocalStorage | Có | Kiểm tra CRUD thực tế trên trình duyệt |
| AI mock panels | Có khung luồng | Bổ sung failure state, copy tiếng Việt, UX |
| Nội dung JSON | Có | Kiểm tra tính hợp lý văn hóa Việt |

## 4. Lỗi AI gặp phải & cách xử lý

- AI đôi khi đề xuất quá nhiều trang → nhóm giới hạn ≤30 và ưu tiên luồng nghiệp vụ
- Mock AI quá “hoàn hảo” → cố tình thêm tỷ lệ thất bại và thông báo không chắc chắn
- Navigation không nhất quán giữa các role → SV3 chịu trách nhiệm chuẩn hóa cuối

## 5. Điều nhóm học được

- AI chỉ hỗ trợ, không thay thế phân tích nghiệp vụ và kiểm thử
- Trải nghiệm AI phải có giải thích + quyền kiểm soát của người dùng
- Phải có trạng thái thất bại / không chắc chắn cho mọi AI feature quan trọng

## 6. Tính năng nào chỉ mock / nào gọi API thật

- Tất cả 3 AI hiện tại là mock hoàn toàn bằng JavaScript (không gọi LLM API thật)
- Có thể nâng cấp sau bằng cách thay hàm generate bằng fetch tới API (OpenAI, Gemini, v.v.) nếu nhóm muốn

---

*Cập nhật khi nhóm thay đổi cách dùng AI.*
