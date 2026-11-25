# Thông Ngữ

Ứng dụng dịch văn bản với 16 lựa chọn ngôn ngữ. Chế độ **Tự nhận diện** được chọn sẵn cho ngôn ngữ nguồn. Anh chỉ cần chọn ngôn ngữ đích. Với chữ viết tắt, câu quá ngắn hoặc nội dung pha nhiều ngôn ngữ, anh có thể nhập thêm văn bản hoặc chọn nguồn thủ công.


## Lộ trình học tiếng Anh

App mở vào **Lộ trình học**. Bảy bài nhập môn xoay quanh các tình huống hằng ngày như giới thiệu bản thân, gọi đồ uống và hỏi đường. Mỗi bài gồm nghe và đọc hội thoại, tự nhớ nghĩa của từ, chép câu nghe được, rồi nói và viết câu theo tình huống.

Sau mỗi lượt gợi nhớ, app đặt lịch ôn từ vào ngày sau hoặc giãn dần theo các mốc 1, 3, 7, 14 và 30 ngày. Anh mở **Ôn từ đến hạn** khi có từ cần ôn. Tiến độ bài học và lịch ôn được lưu trên thiết bị. Phần nghe dùng giọng đọc tiếng Anh của hệ thống. Chép chính tả có đối chiếu với câu mẫu, còn bài nói và viết mở để anh tự so sánh với ví dụ.

### Tài liệu tham khảo

- [Dunlosky và cộng sự, Improving Students’ Learning With Effective Learning Techniques](https://pubmed.ncbi.nlm.nih.gov/26173288/) — tự kiểm tra và học cách quãng.
- [Paul Nation, The Four Strands](https://www.victoria.ac.nz/__data/assets/pdf_file/0019/1626121/2007-Four-strands.pdf) — kết hợp đầu vào qua nghe, đọc với đầu ra qua nói, viết và luyện kiến thức ngôn ngữ.
- [British Council LearnEnglish, Five tips for busy learners](https://learnenglish.britishcouncil.org/english-levels/improve-your-english-level/five-tips-busy-learners-listening-speaking) — luyện nghe và nói với các hoạt động ngắn.

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
