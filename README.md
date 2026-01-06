# hypr-GNOME

Bring the power of Hyprland to GNOME! This extension adds dynamic tiling, smooth animations, customizable gestures, and advanced window management to your GNOME desktop running on Wayland.

## Features

### 🎨 Advanced Theming (Inspired by OpenBar & vinceliuice)
- **Top Bar/Panel Customization**: Style the GNOME top panel with Fixed, Floating, or Islands layouts
- **Menu Theming**: Customize Calendar, Notifications, and Quick Settings menus
- **Dash/Dock Styling**: Apply custom appearance to the application dash
- **Auto-Theming**: Automatically generate beautiful themes from your desktop background
- **Color Palette Generation**: Extract color palettes from wallpapers
- **Easy Color Pickers**: Intuitive color selection with transparency controls
- **Import/Export**: Save and share your theme configurations
- **GRUB2 Bootloader Theming**: Customize your bootloader with themes from vinceliuice's collection (Tela, Vimix, WhiteSur, Elegant, Wuthering)
- **GDM Login Screen**: Personalize your login screen with custom backgrounds and colors
- **GTK Theme Management**: Easily apply beautiful GTK themes (Orchis, WhiteSur, Graphite, Colloid, Qogir, Layan, Mojave, Fluent)
- **Icon & Cursor Themes**: Manage icon themes and cursor themes from vinceliuice's repositories

### 🪟 Dynamic Tiling Window Management
- **Multiple Layout Modes**: Choose from master-stack, grid, monocle, or dwindle layouts
- **Configurable Gaps**: Adjust spacing between windows
- **Master-Stack Layout**: Customize master window count and ratio
- **Automatic Tiling**: Windows automatically arrange themselves in your chosen layout

### ✨ Smooth Animations
- **Window Open Animations**: Beautiful fade-in and scale effects
- **Attention Animations**: Windows demanding attention get subtle animations
- **Customizable Duration**: Adjust animation speed to your preference
- **Multiple Easing Curves**: Choose from ease-out, ease-in, ease-in-out, linear, or spring

### 🎹 Custom Keybindings
Hyprland-inspired keyboard shortcuts (defaults):
- `Super + H/J/K/L` - Move window (left/down/up/right)
- `Super + Shift + H/J/K/L` - Focus window (left/down/up/right)
- `Super + T` - Toggle tiling mode
- `Super + F` - Toggle floating mode

All keybindings are fully customizable through the preferences.

### 👆 Touchpad Gestures
- **Swipe Between Workspaces**: Use touchpad gestures to switch workspaces (when enabled)

### 📋 Window Rules
Define rules for specific windows using pattern matching:
- `float,.*firefox.*` - Make all Firefox windows float
- `tile,.*terminal.*` - Force all terminal windows to tile
- `fullscreen,.*mpv.*` - Make mpv windows fullscreen

## Installation

### From Source

1. Clone this repository:
```bash
git clone https://github.com/stefan-hacks/hypr-GNOME.git
cd hypr-GNOME
```

2. Install the extension:
```bash
make install
```

Or manually:
```bash
mkdir -p ~/.local/share/gnome-shell/extensions/hypr-gnome@hyprland.com
cp -r * ~/.local/share/gnome-shell/extensions/hypr-gnome@hyprland.com/
```

3. Compile the schema:
```bash
glib-compile-schemas ~/.local/share/gnome-shell/extensions/hypr-gnome@hyprland.com/schemas/
```

4. Restart GNOME Shell:
   - Press `Alt + F2`, type `r`, and press Enter
   - Or log out and log back in

5. Enable the extension:
   - Open GNOME Extensions app
   - Find "hypr-GNOME" and toggle it on
   - Click the settings icon to configure

### From GNOME Extensions Website

(Coming soon - when published to extensions.gnome.org)

## Configuration

Open GNOME Extensions app and click the settings (⚙️) icon next to hypr-GNOME to access all configuration options:

### General Settings
- **Enable Dynamic Tiling**: Toggle automatic window tiling
- **Enable Animations**: Toggle window animations
- **Enable Touchpad Gestures**: Toggle gesture support
- **Enable Custom Keybindings**: Toggle keyboard shortcuts

### Tiling Settings
- **Tiling Layout**: Choose between master-stack, grid, monocle, or dwindle
- **Gap Size**: Space between windows (0-50 pixels)
- **Master Window Count**: Number of windows in master area (1-10)
- **Master Area Ratio**: Width of master area (0.1-0.9)

### Animation Settings
- **Animation Duration**: Speed of animations (100-2000ms)
- **Animation Curve**: Easing function
- **Window Open Animation**: Animate windows when opening
- **Attention Animation**: Animate windows demanding attention

### Gesture Settings
- **Swipe Between Workspaces**: Enable workspace switching via gestures

### Window Rules
Define custom rules for specific windows. Format: `action,pattern` (one per line)

### Theming Settings

#### Auto-Theming
- **Enable Auto-Theming**: Toggle automatic theme generation from wallpaper
- **Theme Mode**: Choose between True Color, Pastel, Dark, or Light themes
- **Refresh on Background Change**: Automatically update theme when wallpaper changes
- **Generate Theme Now**: Create theme from current background instantly

#### Top Bar/Panel
- **Panel Type**: Fixed, Floating, or Islands style
- **Colors**: Background and foreground colors with transparency
- **Dimensions**: Height, margin, padding, and border radius
- **Border**: Width and color customization

#### Menus
- **Menu Styling**: Customize Calendar, Notifications, and Quick Settings
- **Colors**: Background and foreground with transparency
- **Border Radius**: Rounded corners for menus
- **Shadows**: Add depth with customizable shadows

#### Dash/Dock
- **Background**: Color and transparency
- **Border Radius**: Rounded corners
- **Full customization** of the application dash appearance

### GRUB2 Bootloader Theming

Customize your bootloader appearance with themes inspired by [vinceliuice's grub2-themes](https://github.com/vinceliuice/grub2-themes):

- **Theme Selection**: Choose from Tela, Vimix, Stylish, WhiteSur, Elegant, and Wuthering themes
- **Easy Installation**: One-click theme installation and application
- **Automatic Configuration**: Themes are automatically configured for your system

### GDM Login Screen Theming

Personalize your login screen:

- **Theme Modes**: Match with GNOME theme, custom background, or custom color
- **Background Images**: Set custom background images for the login screen
- **Background Colors**: Choose custom colors for a unified look

### GTK & Desktop Theme Management

Apply beautiful desktop themes from [vinceliuice's collection](https://github.com/vinceliuice):

- **GTK Themes**: Orchis, WhiteSur, Graphite, Colloid, Qogir, Layan, Mojave, Fluent
- **Icon Themes**: WhiteSur, Tela, Colloid, Qogir, Fluent icon themes
- **One-Click Installation**: Download and install themes directly from GitHub repositories
- **Automatic Application**: Themes are applied instantly after installation

## Requirements

- GNOME Shell 44, 45, 46, 47, 48, 49, or 50 (fully tested on GNOME 48+)
- Wayland session (this extension is designed for Wayland)
- Linux with GNOME desktop environment (tested on Debian GNOME)

## Compatibility

This extension is fully compatible with:
- **GNOME Shell 44-50** (primary focus on GNOME 48+)
- **Debian GNOME** (tested and verified)
- **Wayland sessions** (required)

### GNOME 48+ Features
- All features have been tested and optimized for GNOME 48
- Enhanced error handling for API compatibility
- Improved window management for newer GNOME versions
- Modern stylesheet loading compatible with GNOME 48+

## Troubleshooting

### Extension not loading
- Make sure you're running GNOME on Wayland (check with `echo $XDG_SESSION_TYPE`)
- Verify the schema is compiled: `glib-compile-schemas ~/.local/share/gnome-shell/extensions/hypr-gnome@hyprland.com/schemas/`
- Check logs: `journalctl -f -o cat /usr/bin/gnome-shell`
- For GNOME 48+, ensure you have the latest version of the extension

### Keybindings not working
- Make sure "Enable Custom Keybindings" is enabled in preferences
- Check for conflicts with existing GNOME shortcuts
- Some keybindings may require reloading the extension

### Tiling not working
- Ensure "Enable Dynamic Tiling" is enabled
- Try changing the layout mode
- Check if windows are in the correct workspace

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

GPL-3.0 or later

## Acknowledgments

- Inspired by [Hyprland](https://hyprland.org/) - A highly customizable dynamic tiling Wayland compositor
- Theming features inspired by [OpenBar](https://github.com/neuromorph/openbar) - An excellent GNOME Shell theming extension
- GRUB2, GDM, and GTK theme integration inspired by [vinceliuice](https://github.com/vinceliuice) - Creator of beautiful themes including:
  - [grub2-themes](https://github.com/vinceliuice/grub2-themes) - Modern GRUB2 bootloader themes
  - [Orchis Theme](https://github.com/vinceliuice/Orchis-theme) - Material Design theme for GNOME
  - [WhiteSur Theme](https://github.com/vinceliuice/WhiteSur-gtk-theme) - macOS Big Sur inspired theme
  - [Graphite Theme](https://github.com/vinceliuice/Graphite-gtk-theme) - Modern GTK theme
  - And many other beautiful themes!

## References

- [Hyprland Wiki](https://wiki.hyprland.org/)
- [GNOME Shell Extensions Documentation](https://gjs.guide/extensions/)
- [Hypr Ecosystem](https://wiki.hyprland.org/Hypr-Ecosystem/)

