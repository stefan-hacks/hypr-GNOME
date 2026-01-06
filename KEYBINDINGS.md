# hypr-GNOME Keybindings Reference

Default keyboard shortcuts for hypr-GNOME (inspired by Hyprland):

## Window Movement
- `Super + H` - Move window left
- `Super + J` - Move window down  
- `Super + K` - Move window up
- `Super + L` - Move window right

## Window Focus
- `Super + Shift + H` - Focus window to the left
- `Super + Shift + J` - Focus window below
- `Super + Shift + K` - Focus window above
- `Super + Shift + L` - Focus window to the right

## Window Management
- `Super + T` - Toggle tiling mode
- `Super + F` - Toggle floating mode

## Customization

All keybindings can be customized through:
1. GNOME Extensions app → hypr-GNOME → Settings → Keybindings tab
2. Or directly via `gsettings`:
   ```bash
   gsettings set org.gnome.shell.extensions.hypr-gnome.move-window-left '<Super>h'
   ```

## Keybinding Format

Keybindings use GNOME's keybinding format:
- `Super` or `<Super>` - Windows/Command key
- `Control` or `<Control>` - Ctrl key
- `Alt` or `<Alt>` - Alt key
- `Shift` or `<Shift>` - Shift key
- Letter keys: `a`, `b`, `c`, etc.
- Special keys: `Return`, `Space`, `Tab`, `Escape`, etc.

Examples:
- `'<Super>t'` - Super + T
- `'<Super><Shift>h'` - Super + Shift + H
- `'<Control><Alt>t'` - Ctrl + Alt + T

## Vim-Style Navigation

The default keybindings follow vim-style navigation:
- `H` / `Shift+H` - Left
- `J` / `Shift+J` - Down
- `K` / `Shift+K` - Up  
- `L` / `Shift+L` - Right

This matches Hyprland's default behavior for intuitive window management.

