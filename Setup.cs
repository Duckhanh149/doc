using System;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using System.Windows.Forms;

internal static class Setup
{
    private static readonly string[] AppFiles = {
        "index.html", "style.css", "app.js", "detector.js", "Detector-Licenses.txt", "README.md"
    };

    [STAThread]
    private static void Main()
    {
        const string title = "Thông Ngữ";
        string destination = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "Programs", "Thong Ngu");
        string shortcut = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.Programs), "Thông Ngữ.lnk");
        if (MessageBox.Show("Cài hoặc cập nhật Thông Ngữ cho tài khoản Windows hiện tại?",
                title, MessageBoxButtons.YesNo, MessageBoxIcon.Question) != DialogResult.Yes)
            return;

        string staging = Path.Combine(Path.GetTempPath(), "ThongNgu-" + Guid.NewGuid().ToString("N"));
        try
        {
            Directory.CreateDirectory(staging);
            using (Stream package = Assembly.GetExecutingAssembly().GetManifestResourceStream("app.zip"))
            using (var archive = new ZipArchive(package, ZipArchiveMode.Read))
            {
                foreach (string name in AppFiles)
                    archive.GetEntry(name).ExtractToFile(Path.Combine(staging, name));
            }

            Directory.CreateDirectory(destination);
            foreach (string name in AppFiles)
                File.Copy(Path.Combine(staging, name), Path.Combine(destination, name), true);

            string app = Path.Combine(destination, "index.html");
            dynamic shell = Activator.CreateInstance(Type.GetTypeFromProgID("WScript.Shell"));
            dynamic link = shell.CreateShortcut(shortcut);
            link.TargetPath = app;
            link.WorkingDirectory = destination;
            link.Description = "Mở Thông Ngữ";
            link.Save();

            if (MessageBox.Show("Đã cài đặt. Anh có thể tìm Thông Ngữ trong Start Menu.\n\nMở ứng dụng ngay?",
                    title, MessageBoxButtons.YesNo, MessageBoxIcon.Information) == DialogResult.Yes)
                Process.Start(new ProcessStartInfo(app) { UseShellExecute = true });
        }
        catch (Exception error)
        {
            MessageBox.Show("Không thể hoàn tất thao tác.\n\n" + error.Message,
                title, MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
        finally
        {
            try { Directory.Delete(staging, true); }
            catch (IOException) { }
            catch (UnauthorizedAccessException) { }
        }
    }
}
