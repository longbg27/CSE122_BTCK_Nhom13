# Báo cáo sử dụng AI – CultureTrail

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
- **Vị trí:** `creator-story-form.html` (người sáng tạo), `explorer-story-detail.html` (chế độ xem)
- **Đầu vào:** tiêu đề + nội dung câu chuyện; yêu cầu nội dung ≥ 80 ký tự, nếu thiếu thì báo lỗi và đưa con trỏ về ô nội dung
- **Luồng:** Nhấn “Tạo tóm tắt” → Đang xử lý (`aria-busy`, `aria-live`) → Bản tóm tắt + giải thích “Vì sao” → Chấp nhận / Chỉnh sửa / Từ chối / Tạo lại
- **Cách mô phỏng:** JavaScript chọn 2 câu đầu giàu thông tin, giữ giọng kể, rút gọn ≤ 300 ký tự; delay 1,4 giây; random failure ~12%
- **Trạng thái thất bại:** “AI chưa thể tạo bản tóm tắt đủ tốt…” + Thử lại / Tự viết; không chặn việc lưu câu chuyện
- **Quyền kiểm soát:** người dùng quyết định áp dụng; “Chỉnh sửa” đưa gợi ý vào ô tóm tắt và đặt con trỏ cuối; nội dung gốc không bị thay đổi

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

## 7. Ghi chú triển khai AI-2 (SV2)

- AI-2 được đặt ngay trong form tạo/sửa câu chuyện để người sáng tạo dùng khi viết nội dung, không chỉ xem lại.
- Có đủ 4 trạng thái giao diện: nhập → đang xử lý → kết quả → thất bại; trạng thái thất bại không làm mất nội dung đã viết.
- Thông báo trạng thái dùng `aria-live`; nút bị khóa trong lúc xử lý; kết quả nêu rõ lý do để người dùng đánh giá.
- Khi sửa câu chuyện đã bị từ chối, lưu lại sẽ chuyển về “Chờ duyệt” và xóa ghi chú từ chối cũ; các trạng thái khác được giữ nguyên.

---

*Cập nhật khi nhóm thay đổi cách dùng AI.*
