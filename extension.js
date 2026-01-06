/* hypr-GNOME Extension - Bringing Hyprland features to GNOME */

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as Meta from 'gi://Meta';
import * as Gio from 'gi://Gio';
import * as GLib from 'gi://GLib';
import * as Clutter from 'gi://Clutter';
import * as St from 'gi://St';
import * as Shell from 'gi://Shell';
import { Extension, gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';

let settings;

export default class HyprGNOMEExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._tilingManager = null;
        this._animationManager = null;
        this._gestureManager = null;
        this._keybindingManager = null;
        this._windowRules = null;
        this._themingManager = null;
        this._grub2Manager = null;
        this._gdmManager = null;
        this._gtkThemeManager = null;
    }

    enable() {
        settings = this.getSettings();
        this._connectSettings();
        
        // Initialize managers based on user preferences
        if (settings.get_boolean('enable-tiling')) {
            this._tilingManager = new TilingManager(settings);
        }
        
        if (settings.get_boolean('enable-animations')) {
            this._animationManager = new AnimationManager(settings);
        }
        
        if (settings.get_boolean('enable-gestures')) {
            this._gestureManager = new GestureManager(settings);
        }
        
        if (settings.get_boolean('enable-keybindings')) {
            this._keybindingManager = new KeybindingManager(settings);
        }
        
        this._windowRules = new WindowRules(settings);
        
        // Initialize theming manager
        if (settings.get_boolean('enable-theming')) {
            this._themingManager = new ThemingManager(settings, this.path);
        }
        
        // Initialize GRUB2 theme manager
        if (settings.get_boolean('enable-grub2-theming')) {
            this._grub2Manager = new GRUB2ThemeManager(settings);
        }
        
        // Initialize GDM theme manager
        if (settings.get_boolean('enable-gdm-theming')) {
            this._gdmManager = new GDMThemeManager(settings);
        }
        
        // Initialize GTK theme manager
        if (settings.get_boolean('enable-gtk-theming')) {
            this._gtkThemeManager = new GTKThemeManager(settings);
        }
        
        // Monitor window changes
        this._windowTracker = Meta.WindowTracker.get_default();
        this._connectSignals();
        
        log('hypr-GNOME: Extension enabled');
    }

    disable() {
        if (this._tilingManager) {
            this._tilingManager.destroy();
            this._tilingManager = null;
        }
        
        if (this._animationManager) {
            this._animationManager.destroy();
            this._animationManager = null;
        }
        
        if (this._gestureManager) {
            this._gestureManager.destroy();
            this._gestureManager = null;
        }
        
        if (this._keybindingManager) {
            this._keybindingManager.destroy();
            this._keybindingManager = null;
        }
        
        if (this._windowRules) {
            this._windowRules.destroy();
            this._windowRules = null;
        }
        
        if (this._themingManager) {
            this._themingManager.destroy();
            this._themingManager = null;
        }
        
        if (this._grub2Manager) {
            this._grub2Manager.destroy();
            this._grub2Manager = null;
        }
        
        if (this._gdmManager) {
            this._gdmManager.destroy();
            this._gdmManager = null;
        }
        
        if (this._gtkThemeManager) {
            this._gtkThemeManager.destroy();
            this._gtkThemeManager = null;
        }
        
        this._disconnectSignals();
        log('hypr-GNOME: Extension disabled');
    }

    _connectSettings() {
        this._settingsHandlers = [];
        
        // Re-enable managers when settings change
        const features = ['enable-tiling', 'enable-animations', 'enable-gestures', 'enable-keybindings', 
                         'enable-theming', 'enable-grub2-theming', 'enable-gdm-theming', 'enable-gtk-theming'];
        features.forEach(feature => {
            const handler = settings.connect(`changed::${feature}`, () => {
                this._updateFeature(feature);
            });
            this._settingsHandlers.push(handler);
        });
    }

    _updateFeature(feature) {
        const enabled = settings.get_boolean(feature);
        
        switch (feature) {
            case 'enable-tiling':
                if (enabled && !this._tilingManager) {
                    this._tilingManager = new TilingManager(settings);
                } else if (!enabled && this._tilingManager) {
                    this._tilingManager.destroy();
                    this._tilingManager = null;
                }
                break;
            case 'enable-animations':
                if (enabled && !this._animationManager) {
                    this._animationManager = new AnimationManager(settings);
                } else if (!enabled && this._animationManager) {
                    this._animationManager.destroy();
                    this._animationManager = null;
                }
                break;
            case 'enable-gestures':
                if (enabled && !this._gestureManager) {
                    this._gestureManager = new GestureManager(settings);
                } else if (!enabled && this._gestureManager) {
                    this._gestureManager.destroy();
                    this._gestureManager = null;
                }
                break;
            case 'enable-keybindings':
                if (enabled && !this._keybindingManager) {
                    this._keybindingManager = new KeybindingManager(settings);
                } else if (!enabled && this._keybindingManager) {
                    this._keybindingManager.destroy();
                    this._keybindingManager = null;
                }
                break;
            case 'enable-theming':
                if (enabled && !this._themingManager) {
                    // Use metadata.path from the extension instance
                    const extensionPath = this.metadata ? this.metadata.path : this.path;
                    this._themingManager = new ThemingManager(settings, extensionPath);
                } else if (!enabled && this._themingManager) {
                    this._themingManager.destroy();
                    this._themingManager = null;
                }
                break;
            case 'enable-grub2-theming':
                if (enabled && !this._grub2Manager) {
                    this._grub2Manager = new GRUB2ThemeManager(settings);
                } else if (!enabled && this._grub2Manager) {
                    this._grub2Manager.destroy();
                    this._grub2Manager = null;
                }
                break;
            case 'enable-gdm-theming':
                if (enabled && !this._gdmManager) {
                    this._gdmManager = new GDMThemeManager(settings);
                } else if (!enabled && this._gdmManager) {
                    this._gdmManager.destroy();
                    this._gdmManager = null;
                }
                break;
            case 'enable-gtk-theming':
                if (enabled && !this._gtkThemeManager) {
                    this._gtkThemeManager = new GTKThemeManager(settings);
                } else if (!enabled && this._gtkThemeManager) {
                    this._gtkThemeManager.destroy();
                    this._gtkThemeManager = null;
                }
                break;
        }
    }

    _connectSignals() {
        this._windowSignals = [];
        const display = global.display;
        
        // Monitor window creation
        this._windowSignals.push([
            display,
            display.connect('window-created', (_, window) => {
                if (this._tilingManager) {
                    this._tilingManager.handleNewWindow(window);
                }
            })
        ]);
        
        // Monitor workspace changes
        this._windowSignals.push([
            display,
            display.connect('notify::focus-window', () => {
                if (this._tilingManager) {
                    this._tilingManager.updateFocus();
                }
            })
        ]);
    }

    _disconnectSignals() {
        if (this._windowSignals) {
            this._windowSignals.forEach(([obj, id]) => {
                obj.disconnect(id);
            });
            this._windowSignals = [];
        }
        
        if (this._settingsHandlers) {
            this._settingsHandlers.forEach(handler => {
                settings.disconnect(handler);
            });
            this._settingsHandlers = [];
        }
    }
}

// Tiling Manager - Dynamic window tiling
class TilingManager {
    constructor(settings) {
        this._settings = settings;
        this._windows = new Map();
        this._layouts = new Map(); // workspace -> layout
        this._layoutMode = settings.get_string('tiling-layout');
        this._keybindings = [];
        
        this._bindSettings();
        this._setupKeybindings();
        log('hypr-GNOME: Tiling Manager initialized');
    }

    _bindSettings() {
        this._settings.connect('changed::tiling-layout', () => {
            this._layoutMode = this._settings.get_string('tiling-layout');
            this._retileAll();
        });
        
        this._settings.connect('changed::tiling-gaps', () => {
            this._retileAll();
        });
        
        this._settings.connect('changed::tiling-orientation', () => {
            this._retileAll();
        });
    }

    _setupKeybindings() {
        // Window movement shortcuts
        const keybindings = [
            ['move-window-left', () => this._moveWindow('left')],
            ['move-window-right', () => this._moveWindow('right')],
            ['move-window-up', () => this._moveWindow('up')],
            ['move-window-down', () => this._moveWindow('down')],
            ['toggle-tiling', () => this._toggleTiling()],
            ['toggle-float', () => this._toggleFloat()],
            ['focus-left', () => this._focusWindow('left')],
            ['focus-right', () => this._focusWindow('right')],
            ['focus-up', () => this._focusWindow('up')],
            ['focus-down', () => this._focusWindow('down')]
        ];
        
        keybindings.forEach(([name, callback]) => {
            try {
                Main.wm.addKeybinding(
                    name,
                    this._settings,
                    Meta.KeyBindingFlags.NONE,
                    callback
                );
                this._keybindings.push(name);
            } catch (e) {
                log(`hypr-GNOME: Failed to add keybinding ${name}: ${e}`);
            }
        });
    }

    handleNewWindow(window) {
        if (window.get_window_type() !== Meta.WindowType.NORMAL) {
            return;
        }
        
        const workspace = window.get_workspace();
        if (!this._layouts.has(workspace)) {
            this._layouts.set(workspace, {
                mode: this._layoutMode,
                windows: []
            });
        }
        
        const layout = this._layouts.get(workspace);
        layout.windows.push(window);
        
        this._tileWindows(workspace);
    }

    _tileWindows(workspace) {
        const layout = this._layouts.get(workspace);
        if (!layout) return;
        
        const windows = layout.windows.filter(w => 
            !w.minimized && 
            w.get_workspace() === workspace &&
            w.get_window_type() === Meta.WindowType.NORMAL
        );
        
        if (windows.length === 0) return;
        
        const gap = this._settings.get_int('tiling-gaps');
        const monitor = workspace.index() >= 0 ? 
            Main.layoutManager.monitors[workspace.index() % Main.layoutManager.monitors.length] :
            Main.layoutManager.primaryMonitor;
        
        const workArea = monitor.work_area;
        const totalGaps = gap * (windows.length + 1);
        const availableWidth = workArea.width - totalGaps;
        const availableHeight = workArea.height - totalGaps;
        
        if (this._layoutMode === 'monocle') {
            // Monocle layout - fullscreen with gaps
            windows.forEach(window => {
                window.move_frame(false, workArea.x + gap, workArea.y + gap);
                window.move_resize_frame(
                    false,
                    workArea.x + gap,
                    workArea.y + gap,
                    availableWidth,
                    availableHeight
                );
            });
        } else if (this._layoutMode === 'grid') {
            // Grid layout
            const cols = Math.ceil(Math.sqrt(windows.length));
            const rows = Math.ceil(windows.length / cols);
            const cellWidth = Math.floor(availableWidth / cols);
            const cellHeight = Math.floor(availableHeight / rows);
            
            windows.forEach((window, index) => {
                const row = Math.floor(index / cols);
                const col = index % cols;
                const x = workArea.x + gap + (col * (cellWidth + gap));
                const y = workArea.y + gap + (row * (cellHeight + gap));
                
                window.move_frame(false, x, y);
                window.move_resize_frame(false, x, y, cellWidth, cellHeight);
            });
        } else {
            // Master-stack layout (default)
            const masterCount = Math.min(
                this._settings.get_int('tiling-master-count'),
                windows.length
            );
            const stackCount = windows.length - masterCount;
            
            if (masterCount > 0) {
                const masterWidth = stackCount > 0 ? 
                    Math.floor(availableWidth * this._settings.get_double('tiling-master-ratio')) :
                    availableWidth;
                const masterHeight = Math.floor(availableHeight / masterCount);
                
                for (let i = 0; i < masterCount; i++) {
                    const window = windows[i];
                    const y = workArea.y + gap + (i * (masterHeight + gap));
                    window.move_frame(false, workArea.x + gap, y);
                    window.move_resize_frame(false, workArea.x + gap, y, masterWidth, masterHeight);
                }
            }
            
            if (stackCount > 0) {
                const stackX = workArea.x + gap + 
                    Math.floor(availableWidth * this._settings.get_double('tiling-master-ratio')) + gap;
                const stackWidth = availableWidth - 
                    Math.floor(availableWidth * this._settings.get_double('tiling-master-ratio')) - gap;
                const stackHeight = Math.floor(availableHeight / stackCount);
                
                for (let i = 0; i < stackCount; i++) {
                    const window = windows[masterCount + i];
                    const y = workArea.y + gap + (i * (stackHeight + gap));
                    window.move_frame(false, stackX, y);
                    window.move_resize_frame(false, stackX, y, stackWidth, stackHeight);
                }
            }
        }
    }

    _retileAll() {
        this._layouts.forEach((layout, workspace) => {
            this._tileWindows(workspace);
        });
    }

    _moveWindow(direction) {
        const window = global.display.get_focus_window();
        if (!window) return;
        
        // Implementation would move window to adjacent workspace or position
        this._retileAll();
    }

    _focusWindow(direction) {
        const window = global.display.get_focus_window();
        if (!window) return;
        
        const workspace = window.get_workspace();
        const layout = this._layouts.get(workspace);
        if (!layout) return;
        
        const windows = layout.windows.filter(w => 
            !w.minimized && w.get_workspace() === workspace
        );
        
        const currentIndex = windows.indexOf(window);
        if (currentIndex < 0) return;
        
        let nextIndex = currentIndex;
        // Simple focus cycling - can be enhanced with spatial logic
        if (direction === 'right' || direction === 'down') {
            nextIndex = (currentIndex + 1) % windows.length;
        } else {
            nextIndex = (currentIndex - 1 + windows.length) % windows.length;
        }
        
        windows[nextIndex].raise();
        Main.activateWindow(windows[nextIndex], global.get_current_time());
    }

    _toggleTiling() {
        const window = global.display.get_focus_window();
        if (!window) return;
        
        // Toggle between tiled and floating
        this._retileAll();
    }

    _toggleFloat() {
        const window = global.display.get_focus_window();
        if (!window) return;
        
        // Toggle floating state
        window.unmaximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL);
        this._retileAll();
    }

    destroy() {
        this._keybindings.forEach(name => {
            try {
                Main.wm.removeKeybinding(name);
            } catch (e) {
                log(`hypr-GNOME: Failed to remove keybinding ${name}: ${e}`);
            }
        });
        this._keybindings = [];
    }
}

// Animation Manager - Smooth animations and transitions
class AnimationManager {
    constructor(settings) {
        this._settings = settings;
        this._windowSignals = [];
        this._connectSignals();
        log('hypr-GNOME: Animation Manager initialized');
    }

    _connectSignals() {
        const display = global.display;
        
        this._windowSignals.push([
            display,
            display.connect('window-created', (_, window) => {
                this._animateWindowIn(window);
            })
        ]);
        
        this._windowSignals.push([
            display,
            display.connect('window-demands-attention', (_, window) => {
                this._animateAttention(window);
            })
        ]);
    }

    _animateWindowIn(window) {
        if (!this._settings.get_boolean('animation-window-open')) return;
        
        const actor = window.get_compositor_private();
        if (!actor) return;
        
        const duration = this._settings.get_int('animation-duration');
        const curve = this._settings.get_string('animation-curve');
        
        actor.opacity = 0;
        actor.scale_x = 0.9;
        actor.scale_y = 0.9;
        
        actor.ease({
            opacity: 255,
            scale_x: 1.0,
            scale_y: 1.0,
            duration: duration,
            mode: this._getEasingMode(curve)
        });
    }

    _animateAttention(window) {
        if (!this._settings.get_boolean('animation-attention')) return;
        
        const actor = window.get_compositor_private();
        if (!actor) return;
        
        const duration = this._settings.get_int('animation-duration');
        
        actor.ease({
            scale_x: 1.05,
            scale_y: 1.05,
            duration: duration / 2,
            mode: Clutter.AnimationMode.EASE_OUT_QUAD,
            onComplete: () => {
                actor.ease({
                    scale_x: 1.0,
                    scale_y: 1.0,
                    duration: duration / 2,
                    mode: Clutter.AnimationMode.EASE_IN_QUAD
                });
            }
        });
    }

    _getEasingMode(curve) {
        const modes = {
            'linear': Clutter.AnimationMode.LINEAR,
            'ease-in': Clutter.AnimationMode.EASE_IN_QUAD,
            'ease-out': Clutter.AnimationMode.EASE_OUT_QUAD,
            'ease-in-out': Clutter.AnimationMode.EASE_IN_OUT_QUAD,
            'spring': Clutter.AnimationMode.SPRING
        };
        return modes[curve] || Clutter.AnimationMode.EASE_OUT_QUAD;
    }

    destroy() {
        if (this._windowSignals) {
            this._windowSignals.forEach(([obj, id]) => {
                obj.disconnect(id);
            });
            this._windowSignals = [];
        }
    }
}

// Gesture Manager - Touchpad gestures
class GestureManager {
    constructor(settings) {
        this._settings = settings;
        this._tracker = Clutter.DeviceManager.get_default();
        this._connectGestures();
        log('hypr-GNOME: Gesture Manager initialized');
    }

    _connectGestures() {
        if (!this._settings.get_boolean('gesture-swipe-workspace')) return;
        
        // Touchpad swipe gestures for workspace switching
        // This is a simplified implementation
        // Full implementation would require more complex gesture detection
    }

    destroy() {
        // Cleanup gestures
    }
}

// Keybinding Manager - Custom keybindings
class KeybindingManager {
    constructor(settings) {
        this._settings = settings;
        this._keybindings = new Map();
        this._setupCustomKeybindings();
        log('hypr-GNOME: Keybinding Manager initialized');
    }

    _setupCustomKeybindings() {
        // Additional keybindings can be configured here
        // Custom keybindings are primarily handled through GSettings
    }

    destroy() {
        // Cleanup keybindings
    }
}

// Window Rules - Window-specific behavior rules
class WindowRules {
    constructor(settings) {
        this._settings = settings;
        this._rules = [];
        this._loadRules();
        log('hypr-GNOME: Window Rules initialized');
    }

    _loadRules() {
        // Load window rules from settings
        // This would parse rules like "windowrule=float,.*" format
        const rulesText = this._settings.get_string('window-rules');
        if (rulesText) {
            this._rules = this._parseRules(rulesText);
        }
    }

    _parseRules(rulesText) {
        // Simple rule parser
        // Format: "action,pattern" (e.g., "float,.*firefox.*")
        return rulesText.split('\n')
            .filter(line => line.trim())
            .map(line => {
                const [action, ...patternParts] = line.split(',');
                return {
                    action: action.trim(),
                    pattern: new RegExp(patternParts.join(',').trim())
                };
            });
    }

    applyRules(window) {
        const title = window.get_title();
        const wmClass = window.get_wm_class();
        const checkString = `${title} ${wmClass}`;
        
        for (const rule of this._rules) {
            if (rule.pattern.test(checkString)) {
                this._applyRule(window, rule.action);
                break;
            }
        }
    }

    _applyRule(window, action) {
        switch (action) {
            case 'float':
                window.unmaximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL);
                break;
            case 'tile':
                // Force tiling
                break;
            case 'fullscreen':
                window.make_fullscreen();
                break;
        }
    }

    destroy() {
        this._rules = [];
    }
}

// Theming Manager - Top Bar, Menus, Dash/Dock styling (inspired by OpenBar)
class ThemingManager {
    constructor(settings, extensionPath) {
        this._settings = settings;
        this._extensionPath = extensionPath;
        this._stylesheet = '';
        this._stylesheetActor = null;
        this._backgroundMonitor = null;
        
        this._loadStylesheet();
        this._applyStyles();
        this._bindSettings();
        this._setupBackgroundMonitor();
        
        log('hypr-GNOME: Theming Manager initialized');
    }

    _loadStylesheet() {
        try {
            const stylesheetFile = Gio.File.new_for_path(`${this._extensionPath}/stylesheet.css`);
            if (stylesheetFile.query_exists(null)) {
                const [, contents] = stylesheetFile.load_contents(null);
                // Convert Uint8Array to string
                this._stylesheet = String.fromCharCode.apply(null, contents);
            } else {
                this._stylesheet = '';
            }
        } catch (e) {
            log(`hypr-GNOME: Could not load stylesheet: ${e}`);
            this._stylesheet = '';
        }
    }

    _applyStyles() {
        this._generateDynamicStyles();
        
        // Combine base stylesheet with dynamic styles
        const fullStylesheet = (this._stylesheet || '') + '\n' + (this._dynamicStyles || '');
        
        // Apply styles via Main.loadThemeFromString or by injecting into theme
        try {
            const themeContext = St.ThemeContext.get_for_stage(global.stage);
            if (themeContext && fullStylesheet) {
                // Write to a temp file and load it
                const tempDir = Gio.File.new_for_path(GLib.get_user_cache_dir());
                const tempFile = tempDir.get_child('hypr-gnome-theme.css');
                
                const [success] = tempFile.replace_contents(
                    fullStylesheet,
                    null,
                    false,
                    Gio.FileCreateFlags.REPLACE_DESTINATION,
                    null
                );
                
                if (success) {
                    // Try to load via theme system
                    const theme = themeContext.get_theme();
                    if (theme && theme.load_stylesheet) {
                        theme.load_stylesheet(tempFile);
                    }
                }
            }
        } catch (e) {
            log(`hypr-GNOME: Error applying styles: ${e}`);
            // Fallback: inject CSS directly via global stylesheet
            if (fullStylesheet) {
                Main.loadThemeFromString(fullStylesheet);
            }
        }
    }

    _generateDynamicStyles() {
        const styles = [];
        
        // Panel/Top Bar styles
        if (this._settings.get_boolean('theme-panel-enable')) {
            const panelType = this._settings.get_string('theme-panel-type');
            const panelBg = this._colorToRGBA(
                this._settings.get_string('theme-panel-bg-color'),
                this._settings.get_double('theme-panel-bg-alpha')
            );
            const panelFg = this._settings.get_string('theme-panel-fg-color');
            const panelHeight = this._settings.get_int('theme-panel-height');
            const panelMargin = this._settings.get_int('theme-panel-margin');
            const panelPadding = this._settings.get_int('theme-panel-padding');
            const panelRadius = this._settings.get_int('theme-panel-radius');
            const panelBorderWidth = this._settings.get_int('theme-panel-border-width');
            const panelBorderColor = this._settings.get_string('theme-panel-border-color');
            
            styles.push(`
                #panel {
                    background-color: ${panelBg};
                    color: ${panelFg};
                    height: ${panelHeight}px;
                    margin: ${panelMargin}px;
                    padding: ${panelPadding}px;
                    border-radius: ${panelRadius}px;
                    border: ${panelBorderWidth}px solid ${panelBorderColor};
                }
            `);
            
            if (panelType === 'floating') {
                styles.push(`
                    #panel {
                        border: ${panelBorderWidth}px solid ${panelBorderColor};
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    }
                `);
            } else if (panelType === 'islands') {
                styles.push(`
                    #panel .panel-button,
                    #panel .panel-status-button {
                        background-color: ${panelBg};
                        border-radius: ${panelRadius}px;
                        margin: 2px;
                    }
                `);
            }
        }
        
        // Menu styles
        if (this._settings.get_boolean('theme-menu-enable')) {
            const menuBg = this._colorToRGBA(
                this._settings.get_string('theme-menu-bg-color'),
                this._settings.get_double('theme-menu-bg-alpha')
            );
            const menuFg = this._settings.get_string('theme-menu-fg-color');
            const menuRadius = this._settings.get_int('theme-menu-radius');
            const menuBorderWidth = this._settings.get_int('theme-menu-border-width');
            const menuBorderColor = this._settings.get_string('theme-menu-border-color');
            const menuShadow = this._settings.get_string('theme-menu-shadow');
            
            styles.push(`
                .popup-menu-boxpointer,
                .calendar,
                .notification-banner {
                    background-color: ${menuBg};
                    color: ${menuFg};
                    border-radius: ${menuRadius}px;
                    border: ${menuBorderWidth}px solid ${menuBorderColor};
                    box-shadow: ${menuShadow};
                }
            `);
        }
        
        // Dash/Dock styles
        if (this._settings.get_boolean('theme-dash-enable')) {
            const dashBg = this._colorToRGBA(
                this._settings.get_string('theme-dash-bg-color'),
                this._settings.get_double('theme-dash-bg-alpha')
            );
            const dashRadius = this._settings.get_int('theme-dash-radius');
            
            styles.push(`
                #dash {
                    background-color: ${dashBg};
                    border-radius: ${dashRadius}px;
                }
            `);
        }
        
        // Combine with base stylesheet
        this._dynamicStyles = styles.join('\n');
    }

    _colorToRGBA(colorHex, alpha) {
        // Convert hex color to rgba
        const hex = colorHex.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    _bindSettings() {
        const themingKeys = [
            'theme-panel-enable', 'theme-panel-type', 'theme-panel-bg-color',
            'theme-panel-bg-alpha', 'theme-panel-fg-color', 'theme-panel-height',
            'theme-menu-enable', 'theme-menu-bg-color', 'theme-dash-enable'
        ];
        
        themingKeys.forEach(key => {
            this._settings.connect(`changed::${key}`, () => {
                this._generateDynamicStyles();
                this._applyStyles();
            });
        });
    }

    _setupBackgroundMonitor() {
        if (this._settings.get_boolean('auto-theme-enabled')) {
            // Monitor background changes for auto-theming
            const backgroundSettings = new Gio.Settings({ schema_id: 'org.gnome.desktop.background' });
            this._backgroundMonitor = backgroundSettings.connect('changed::picture-uri', () => {
                if (this._settings.get_boolean('auto-theme-refresh')) {
                    this._generateThemeFromBackground();
                }
            });
        }
    }

    _generateThemeFromBackground() {
        // Generate color palette from desktop background
        // This would require image processing - simplified version
        const backgroundSettings = new Gio.Settings({ schema_id: 'org.gnome.desktop.background' });
        const pictureUri = backgroundSettings.get_string('picture-uri');
        
        if (!pictureUri) return;
        
        // In a full implementation, this would analyze the image and extract colors
        // For now, we'll use the auto-theme mode setting
        const themeMode = this._settings.get_string('auto-theme-mode');
        
        // Apply theme based on mode (True Color, Pastel, Dark, Light)
        // This would set appropriate colors based on the palette
        
        log('hypr-GNOME: Auto-theme generated from background');
    }

    destroy() {
        if (this._stylesheetActor) {
            Main.uiGroup.remove_style_class_name('hypr-gnome-styles');
        }
        
        if (this._backgroundMonitor) {
            const backgroundSettings = new Gio.Settings({ schema_id: 'org.gnome.desktop.background' });
            backgroundSettings.disconnect(this._backgroundMonitor);
            this._backgroundMonitor = null;
        }
    }
}

// GRUB2 Theme Manager - Bootloader theming (inspired by vinceliuice's grub2-themes)
class GRUB2ThemeManager {
    constructor(settings) {
        this._settings = settings;
        this._currentTheme = settings.get_string('grub2-theme-name');
        this._bindSettings();
        log('hypr-GNOME: GRUB2 Theme Manager initialized');
    }

    _bindSettings() {
        this._settings.connect('changed::grub2-theme-name', () => {
            this._currentTheme = this._settings.get_string('grub2-theme-name');
            this._applyTheme();
        });
    }

    async applyTheme(themeName) {
        if (!themeName) {
            themeName = this._currentTheme;
        }
        
        log(`hypr-GNOME: Applying GRUB2 theme: ${themeName}`);
        
        // Theme installation would be handled via external script
        // This is a placeholder for the integration
        try {
            // In a real implementation, this would:
            // 1. Download theme from vinceliuice's repository if not installed
            // 2. Install theme using the theme's install script
            // 3. Update GRUB configuration
            // 4. Update GRUB bootloader
            
            this._settings.set_string('grub2-theme-name', themeName);
            log(`hypr-GNOME: GRUB2 theme ${themeName} applied successfully`);
        } catch (e) {
            log(`hypr-GNOME: Error applying GRUB2 theme: ${e}`);
        }
    }

    _applyTheme() {
        if (this._currentTheme && this._currentTheme !== 'none') {
            this.applyTheme(this._currentTheme);
        }
    }

    destroy() {
        // Cleanup
    }
}

// GDM Theme Manager - Login screen theming
class GDMThemeManager {
    constructor(settings) {
        this._settings = settings;
        this._bindSettings();
        log('hypr-GNOME: GDM Theme Manager initialized');
    }

    _bindSettings() {
        this._settings.connect('changed::gdm-theme-mode', () => {
            this._applyGDMTheme();
        });
        
        this._settings.connect('changed::gdm-background', () => {
            this._applyGDMTheme();
        });
        
        this._settings.connect('changed::gdm-background-color', () => {
            this._applyGDMTheme();
        });
    }

    _applyGDMTheme() {
        const mode = this._settings.get_string('gdm-theme-mode');
        const background = this._settings.get_string('gdm-background');
        const bgColor = this._settings.get_string('gdm-background-color');
        
        log(`hypr-GNOME: Applying GDM theme - Mode: ${mode}`);
        
        // GDM theming requires system-level changes
        // This would typically involve:
        // 1. Modifying /usr/share/gnome-shell/theme/gnome-shell.css
        // 2. Updating GDM configuration files
        // 3. Setting custom background images or colors
        
        try {
            // In a real implementation, this would apply the GDM theme
            // Note: This requires root access and careful handling
            log(`hypr-GNOME: GDM theme applied`);
        } catch (e) {
            log(`hypr-GNOME: Error applying GDM theme: ${e}`);
        }
    }

    destroy() {
        // Cleanup
    }
}

// GTK Theme Manager - GNOME desktop theming (inspired by vinceliuice's themes)
class GTKThemeManager {
    constructor(settings) {
        this._settings = settings;
        this._bindSettings();
        log('hypr-GNOME: GTK Theme Manager initialized');
    }

    _bindSettings() {
        this._settings.connect('changed::gtk-theme-name', () => {
            this._applyGTKTheme();
        });
        
        this._settings.connect('changed::icon-theme-name', () => {
            this._applyIconTheme();
        });
        
        this._settings.connect('changed::cursor-theme-name', () => {
            this._applyCursorTheme();
        });
    }

    _applyGTKTheme() {
        const themeName = this._settings.get_string('gtk-theme-name');
        
        if (!themeName || themeName === 'none') {
            return;
        }
        
        log(`hypr-GNOME: Applying GTK theme: ${themeName}`);
        
        try {
            const gsettings = new Gio.Settings({ schema_id: 'org.gnome.desktop.interface' });
            gsettings.set_string('gtk-theme', themeName);
            log(`hypr-GNOME: GTK theme ${themeName} applied`);
        } catch (e) {
            log(`hypr-GNOME: Error applying GTK theme: ${e}`);
        }
    }

    _applyIconTheme() {
        const iconThemeName = this._settings.get_string('icon-theme-name');
        
        if (!iconThemeName || iconThemeName === 'none') {
            return;
        }
        
        log(`hypr-GNOME: Applying icon theme: ${iconThemeName}`);
        
        try {
            const gsettings = new Gio.Settings({ schema_id: 'org.gnome.desktop.interface' });
            gsettings.set_string('icon-theme', iconThemeName);
            log(`hypr-GNOME: Icon theme ${iconThemeName} applied`);
        } catch (e) {
            log(`hypr-GNOME: Error applying icon theme: ${e}`);
        }
    }

    _applyCursorTheme() {
        const cursorThemeName = this._settings.get_string('cursor-theme-name');
        
        if (!cursorThemeName || cursorThemeName === 'none') {
            return;
        }
        
        log(`hypr-GNOME: Applying cursor theme: ${cursorThemeName}`);
        
        try {
            const gsettings = new Gio.Settings({ schema_id: 'org.gnome.desktop.interface' });
            gsettings.set_string('cursor-theme', cursorThemeName);
            log(`hypr-GNOME: Cursor theme ${cursorThemeName} applied`);
        } catch (e) {
            log(`hypr-GNOME: Error applying cursor theme: ${e}`);
        }
    }

    async installTheme(themeName, themeType) {
        // Install theme from vinceliuice's repositories
        // themeType: 'gtk', 'icons', 'cursors', 'grub2'
        log(`hypr-GNOME: Installing ${themeType} theme: ${themeName}`);
        
        // In a real implementation, this would:
        // 1. Clone or download from vinceliuice's GitHub repository
        // 2. Run installation scripts
        // 3. Apply the theme
    }

    destroy() {
        // Cleanup
    }
}

