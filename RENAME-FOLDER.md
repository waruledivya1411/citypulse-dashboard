# Rename project folder

The app project is **CityPulse Mumbai**. Rename the parent folder on your Desktop:

**From:** `IIT_Gandhinagar`  
**To:** `citypulse-mumbai`

### Steps (Windows)

1. Close Cursor (or close this workspace).
2. On Desktop, right-click the folder `IIT_Gandhinagar` → **Rename** → type `citypulse-mumbai`.
3. Re-open the folder in Cursor: `File → Open Folder → citypulse-mumbai`.

### Or use PowerShell (after closing Cursor)

```powershell
Rename-Item -Path "$env:USERPROFILE\OneDrive\Desktop\IIT_Gandhinagar" -NewName "citypulse-mumbai"
```

After renaming, run the app from the new path:

```bash
cd ~/OneDrive/Desktop/citypulse-mumbai
npm run dev
```
