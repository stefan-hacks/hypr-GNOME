# hypr-GNOME

Bring the power of Hyprland to GNOME! This extension adds dynamic tiling, smooth animations, customizable gestures, and advanced window management to your GNOME desktop running on Wayland.

## Features

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
git clone https://github.com/hyprwm/hypr-GNOME.git
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

## Requirements

- GNOME Shell 44, 45, or 46
- Wayland session (this extension is designed for Wayland)
- Linux with GNOME desktop environment

## Troubleshooting

### Extension not loading
- Make sure you're running GNOME on Wayland (check with `echo $XDG_SESSION_TYPE`)
- Verify the schema is compiled: `glib-compile-schemas ~/.local/share/gnome-shell/extensions/hypr-gnome@hyprland.com/schemas/`
- Check logs: `journalctl -f -o cat /usr/bin/gnome-shell`

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

Inspired by [Hyprland](https://hyprland.org/) - A highly customizable dynamic tiling Wayland compositor.

## References

- [Hyprland Wiki](https://wiki.hyprland.org/)
- [GNOME Shell Extensions Documentation](https://gjs.guide/extensions/)
- [Hypr Ecosystem](https://wiki.hyprland.org/Hypr-Ecosystem/)

