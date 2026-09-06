Set WshShell = CreateObject("WScript.Shell")
strDir = "C:\Users\azpla\Documents\Codex\2026-08-01\build-a-polished-windows-desktop-application\outputs\Java-Server"
WshShell.CurrentDirectory = strDir
WshShell.Run chr(34) & strDir & "\Java.Server.exe" & chr(34), 0, False
WScript.Sleep 2500
WshShell.Run chr(34) & strDir & "\cloudflared.exe" & chr(34) & " tunnel --url http://127.0.0.1:5050", 0, False
