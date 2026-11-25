# Thông Ngữ

Ứng dụng dịch văn bản với 16 lựa chọn ngôn ngữ. Chế độ **Tự nhận diện** được chọn sẵn cho ngôn ngữ nguồn. Anh chỉ cần chọn ngôn ngữ đích. Với chữ viết tắt, câu quá ngắn hoặc nội dung pha nhiều ngôn ngữ, anh có thể nhập thêm văn bản hoặc chọn nguồn thủ công.


## Lộ trình học từ mất gốc đến IELTS

App mở vào **Lộ trình học**. Phần nền tảng tham chiếu CEFR và có bảy bài A1 cũ cùng các bài mới từ Pre-A1 tới B2. Mỗi chặng có mục tiêu và bài nghe, đọc, gợi nhớ, chính tả, nói và viết tương ứng.

- **Pre-A1 và A1** — chữ cái, đánh vần, số, thông tin cá nhân và tương tác quen thuộc.
- **A2** — hiểu thông báo, kể việc đã làm và viết tin nhắn.
- **B1** — nắm ý chính, tóm tắt, kể trải nghiệm và viết ý kiến có ví dụ.
- **B2** — phân tích lập luận, so sánh thông tin và tóm tắt số liệu.
- **IELTS** — chọn Academic hoặc General Training. Hai lộ trình dùng chung Listening và Speaking, có bài Reading và Writing Task 1 riêng, và luyện Writing Task 2.

Bấm **Ôn chặng này** để tự kiểm tra từ và kỹ thuật của chặng đang chọn. **Ôn thẻ đến hạn** gom các thẻ có lịch ôn và câu Listening/Reading làm sai. App lưu tiến độ và lịch ôn trên máy. Ôn cách quãng theo các mốc 1, 3, 7, 14 và 30 ngày. Anh có thể mở một chặng bất kỳ để luyện lại.

Các bài IELTS trong app là bài luyện ngắn tự biên soạn. Listening dùng giọng đọc của hệ thống. Listening và Reading có đáp án và giải thích. Writing có đếm từ, đồng hồ và hướng dẫn tự kiểm; Speaking có câu hỏi và đồng hồ Part 2. App không quy đổi tiến độ CEFR hay điểm bài luyện thành IELTS band. Với đề đủ thời lượng, dùng đề mẫu IELTS chính thức bên dưới.

### Tài liệu tham khảo và luyện thêm

- [Hội đồng châu Âu – mô tả CEFR](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors-search)
- [British Council – năng lực tiếng Anh theo cấp độ](https://learnenglish.britishcouncil.org/level/understand-your-english-level)
- [IELTS Academic – đề mẫu chính thức](https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test)
- [IELTS General Training – đề mẫu chính thức](https://ielts.org/take-a-test/preparation-resources/sample-test-questions/general-training-test)
- [IELTS – tiêu chí chấm và band điểm](https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail)
- [Dunlosky và cộng sự – tự kiểm tra và học cách quãng](https://pubmed.ncbi.nlm.nih.gov/26173288/)

## Từ điển và học tiếng Anh

- Mở **Từ điển & học tiếng Anh** để tra nghĩa và nghe phát âm. Khi tra online, các định nghĩa tiếng Anh đến từ [Free Dictionary API](https://dictionaryapi.dev/). Có thể dịch nghĩa đầu tiên sang tiếng Việt qua MyMemory.
- Lưu từ để ôn trong bộ **Từ đã lưu**, hoặc bắt đầu ngay với 30 từ **Tiếng Anh hằng ngày**. Bấm **Hiện nghĩa** rồi chọn **Đã nhớ** hoặc **Ôn lại**.
- App lưu danh sách từ trên máy. Bộ từ có sẵn và thẻ đã lưu có thể ôn offline. Phát âm sử dụng bản ghi của từ điển hoặc giọng tiếng Anh của hệ thống.

## Cài đặt trên Windows 10/11 (64 bit)

1. Tải [Thong-Ngu-Setup.exe](https://github.com/Duckhanh149/doc/raw/refs/heads/main/Thong-Ngu-Setup.exe) đóng app nếu đang mở, rồi chạy tệp và chọn **Yes** để cài.
2. Tìm **Thong Ngu** trong Start Menu. Ứng dụng mở trong cửa sổ riêng và có biểu tượng trên thanh tác vụ. Nếu máy báo thiếu WebView2 Runtime, tải bản Evergreen từ [Microsoft](https://developer.microsoft.com/microsoft-edge/webview2/).
3. Nhập văn bản hoặc mở tệp UTF-8 .txt, chọn ngôn ngữ đích rồi bấm **Dịch văn bản**.

Bộ cài chạy dưới tài khoản Windows hiện tại và không yêu cầu quyền quản trị. Để gỡ thủ công, xóa thư mục `%LOCALAPPDATA%\Programs\Thong Ngu` và lối tắt **Thong Ngu** trong `shell:programs`.

Bản chạy trong trình duyệt [ZIP portable](https://github.com/Duckhanh149/doc/raw/refs/heads/main/Thong-Ngu-Windows.zip) cũng có sẵn. Giải nén toàn bộ rồi mở `Mo Thong Ngu.cmd` hoặc `index.html`.

Việc nhận diện ngôn ngữ diễn ra trên máy. App cần Internet để gửi văn bản tới MyMemory khi dịch và chịu hạn mức của dịch vụ. Xem giấy phép thư viện nhận diện trong `Detector-Licenses.txt`.
