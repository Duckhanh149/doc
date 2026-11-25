using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

internal sealed class ThongNguWindow : Form
{
    private const string AppUrl = "https://thongngu.local/index.html";
    private readonly WebView2 browser = new WebView2();

    [STAThread]
    private static void Main()
    {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(new ThongNguWindow());
    }

    private ThongNguWindow()
    {
        Text = "Thông Ngữ";
        Icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath);
        ClientSize = new Size(1080, 760);
        MinimumSize = new Size(440, 500);
        StartPosition = FormStartPosition.CenterScreen;
        browser.Dock = DockStyle.Fill;
        Controls.Add(browser);
    }

    protected override async void OnShown(EventArgs args)
    {
        base.OnShown(args);
        try
        {
            string profile = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "Thong Ngu", "WebView2");
            var environment = await CoreWebView2Environment.CreateAsync(null, profile);
            if (IsDisposed) return;

            await browser.EnsureCoreWebView2Async(environment);
            if (IsDisposed) return;

            var web = browser.CoreWebView2;
            web.Settings.AreDevToolsEnabled = false;
            web.Settings.AreDefaultContextMenusEnabled = false;
            web.Settings.IsStatusBarEnabled = false;
            web.NewWindowRequested += (sender, request) => request.Handled = true;
            web.NavigationStarting += (sender, navigation) =>
                navigation.Cancel = !String.Equals(navigation.Uri, AppUrl, StringComparison.Ordinal);
            web.SetVirtualHostNameToFolderMapping(
                "thongngu.local", AppDomain.CurrentDomain.BaseDirectory,
                CoreWebView2HostResourceAccessKind.DenyCors);
            web.Navigate(AppUrl);
        }
        catch (WebView2RuntimeNotFoundException)
        {
            ShowStartupError("Máy cần Microsoft Edge WebView2 Runtime để mở Thông Ngữ.");
        }
        catch (Exception error)
        {
            ShowStartupError("Không thể mở Thông Ngữ.\n\n" + error.Message);
        }
    }

    private void ShowStartupError(string message)
    {
        if (IsDisposed) return;
        MessageBox.Show(this, message, Text, MessageBoxButtons.OK, MessageBoxIcon.Error);
        Close();
    }
}
