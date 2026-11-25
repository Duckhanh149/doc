# Thông Ngữ

Ứng dụng dịch văn bản với 16 lựa chọn ngôn ngữ. Chế độ **Tự nhận diện** được chọn sẵn cho ngôn ngữ nguồn. Anh chỉ cần chọn ngôn ngữ đích. Với chữ viết tắt, câu quá ngắn hoặc nội dung pha nhiều ngôn ngữ, anh có thể nhập thêm văn bản hoặc chọn nguồn thủ công.

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
