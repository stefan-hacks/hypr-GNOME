/* Preferences UI for hypr-GNOME Extension */

import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';
import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/shell/extensions/prefs.js';

export default class HyprGNOMEPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();
        
        // Main page
        const page = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'preferences-system-symbolic'
        });
        
        const group = new Adw.PreferencesGroup({
            title: _('Feature Toggles'),
            description: _('Enable or disable Hyprland features')
        });
        
        // Tiling section
        const tilingRow = new Adw.ActionRow({
            title: _('Enable Dynamic Tiling'),
            subtitle: _('Automatically tile windows in customizable layouts')
        });
        
        const tilingSwitch = new Gtk.Switch({
            active: settings.get_boolean('enable-tiling'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('enable-tiling', tilingSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        tilingRow.add_suffix(tilingSwitch);
        tilingRow.activatable_widget = tilingSwitch;
        group.add(tilingRow);
        
        // Animations section
        const animRow = new Adw.ActionRow({
            title: _('Enable Animations'),
            subtitle: _('Smooth window animations and transitions')
        });
        
        const animSwitch = new Gtk.Switch({
            active: settings.get_boolean('enable-animations'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('enable-animations', animSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        animRow.add_suffix(animSwitch);
        animRow.activatable_widget = animSwitch;
        group.add(animRow);
        
        // Gestures section
        const gestureRow = new Adw.ActionRow({
            title: _('Enable Touchpad Gestures'),
            subtitle: _('Swipe gestures for workspace navigation')
        });
        
        const gestureSwitch = new Gtk.Switch({
            active: settings.get_boolean('enable-gestures'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('enable-gestures', gestureSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        gestureRow.add_suffix(gestureSwitch);
        gestureRow.activatable_widget = gestureSwitch;
        group.add(gestureRow);
        
        // Keybindings section
        const keybindRow = new Adw.ActionRow({
            title: _('Enable Custom Keybindings'),
            subtitle: _('Hyprland-style keyboard shortcuts')
        });
        
        const keybindSwitch = new Gtk.Switch({
            active: settings.get_boolean('enable-keybindings'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('enable-keybindings', keybindSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        keybindRow.add_suffix(keybindSwitch);
        keybindRow.activatable_widget = keybindSwitch;
        group.add(keybindRow);
        
        page.add(group);
        
        // Tiling Settings
        const tilingGroup = new Adw.PreferencesGroup({
            title: _('Tiling Settings'),
            description: _('Configure window tiling behavior')
        });
        
        // Layout mode
        const layoutRow = new Adw.ComboRow({
            title: _('Tiling Layout'),
            subtitle: _('Choose the default tiling layout'),
            model: Gtk.StringList.new(['master-stack', 'grid', 'monocle', 'dwindle'])
        });
        const layoutMap = ['master-stack', 'grid', 'monocle', 'dwindle'];
        const currentLayout = settings.get_string('tiling-layout');
        const layoutIndex = layoutMap.indexOf(currentLayout);
        if (layoutIndex >= 0) {
            layoutRow.set_selected(layoutIndex);
        }
        layoutRow.connect('notify::selected', (row) => {
            settings.set_string('tiling-layout', layoutMap[row.selected]);
        });
        tilingGroup.add(layoutRow);
        
        // Gaps
        const gapsRow = new Adw.ActionRow({
            title: _('Gap Size'),
            subtitle: _('Space between tiled windows (in pixels)')
        });
        
        const gapsSpin = new Gtk.SpinButton({
            adjustment: new Gtk.Adjustment({
                lower: 0,
                upper: 50,
                step_increment: 1,
                page_increment: 5,
                value: settings.get_int('tiling-gaps')
            }),
            valign: Gtk.Align.CENTER
        });
        settings.bind('tiling-gaps', gapsSpin, 'value', Gio.SettingsBindFlags.DEFAULT);
        gapsRow.add_suffix(gapsSpin);
        gapsRow.activatable_widget = gapsSpin;
        tilingGroup.add(gapsRow);
        
        // Master count
        const masterCountRow = new Adw.ActionRow({
            title: _('Master Window Count'),
            subtitle: _('Number of windows in the master area')
        });
        
        const masterCountSpin = new Gtk.SpinButton({
            adjustment: new Gtk.Adjustment({
                lower: 1,
                upper: 10,
                step_increment: 1,
                value: settings.get_int('tiling-master-count')
            }),
            valign: Gtk.Align.CENTER
        });
        settings.bind('tiling-master-count', masterCountSpin, 'value', Gio.SettingsBindFlags.DEFAULT);
        masterCountRow.add_suffix(masterCountSpin);
        masterCountRow.activatable_widget = masterCountSpin;
        tilingGroup.add(masterCountRow);
        
        // Master ratio
        const masterRatioRow = new Adw.ActionRow({
            title: _('Master Area Ratio'),
            subtitle: _('Width ratio of master area (0.0 to 1.0)')
        });
        
        const masterRatioSpin = new Gtk.SpinButton({
            adjustment: new Gtk.Adjustment({
                lower: 0.1,
                upper: 0.9,
                step_increment: 0.05,
                page_increment: 0.1,
                value: settings.get_double('tiling-master-ratio')
            }),
            digits: 2,
            valign: Gtk.Align.CENTER
        });
        settings.bind('tiling-master-ratio', masterRatioSpin, 'value', Gio.SettingsBindFlags.DEFAULT);
        masterRatioRow.add_suffix(masterRatioSpin);
        masterRatioRow.activatable_widget = masterRatioSpin;
        tilingGroup.add(masterRatioRow);
        
        page.add(tilingGroup);
        
        // Animation Settings
        const animGroup = new Adw.PreferencesGroup({
            title: _('Animation Settings'),
            description: _('Configure window animations')
        });
        
        // Animation duration
        const animDurationRow = new Adw.ActionRow({
            title: _('Animation Duration'),
            subtitle: _('Duration of animations in milliseconds')
        });
        
        const animDurationSpin = new Gtk.SpinButton({
            adjustment: new Gtk.Adjustment({
                lower: 100,
                upper: 2000,
                step_increment: 50,
                page_increment: 100,
                value: settings.get_int('animation-duration')
            }),
            valign: Gtk.Align.CENTER
        });
        settings.bind('animation-duration', animDurationSpin, 'value', Gio.SettingsBindFlags.DEFAULT);
        animDurationRow.add_suffix(animDurationSpin);
        animDurationRow.activatable_widget = animDurationSpin;
        animGroup.add(animDurationRow);
        
        // Animation curve
        const animCurveRow = new Adw.ComboRow({
            title: _('Animation Curve'),
            subtitle: _('Easing function for animations'),
            model: Gtk.StringList.new(['ease-out', 'ease-in', 'ease-in-out', 'linear', 'spring'])
        });
        const curveMap = ['ease-out', 'ease-in', 'ease-in-out', 'linear', 'spring'];
        const currentCurve = settings.get_string('animation-curve');
        const curveIndex = curveMap.indexOf(currentCurve);
        if (curveIndex >= 0) {
            animCurveRow.set_selected(curveIndex);
        }
        animCurveRow.connect('notify::selected', (row) => {
            settings.set_string('animation-curve', curveMap[row.selected]);
        });
        animGroup.add(animCurveRow);
        
        // Individual animation toggles
        const animWindowOpenRow = new Adw.ActionRow({
            title: _('Window Open Animation'),
            subtitle: _('Animate windows when they open')
        });
        
        const animWindowOpenSwitch = new Gtk.Switch({
            active: settings.get_boolean('animation-window-open'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('animation-window-open', animWindowOpenSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        animWindowOpenRow.add_suffix(animWindowOpenSwitch);
        animWindowOpenRow.activatable_widget = animWindowOpenSwitch;
        animGroup.add(animWindowOpenRow);
        
        const animAttentionRow = new Adw.ActionRow({
            title: _('Attention Animation'),
            subtitle: _('Animate windows demanding attention')
        });
        
        const animAttentionSwitch = new Gtk.Switch({
            active: settings.get_boolean('animation-attention'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('animation-attention', animAttentionSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        animAttentionRow.add_suffix(animAttentionSwitch);
        animAttentionRow.activatable_widget = animAttentionSwitch;
        animGroup.add(animAttentionRow);
        
        page.add(animGroup);
        
        // Gesture Settings
        const gestureGroup = new Adw.PreferencesGroup({
            title: _('Gesture Settings'),
            description: _('Configure touchpad gestures')
        });
        
        const swipeWorkspaceRow = new Adw.ActionRow({
            title: _('Swipe Between Workspaces'),
            subtitle: _('Use swipe gestures to switch workspaces')
        });
        
        const swipeWorkspaceSwitch = new Gtk.Switch({
            active: settings.get_boolean('gesture-swipe-workspace'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('gesture-swipe-workspace', swipeWorkspaceSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        swipeWorkspaceRow.add_suffix(swipeWorkspaceSwitch);
        swipeWorkspaceRow.activatable_widget = swipeWorkspaceSwitch;
        gestureGroup.add(swipeWorkspaceRow);
        
        page.add(gestureGroup);
        
        // Window Rules
        const rulesGroup = new Adw.PreferencesGroup({
            title: _('Window Rules'),
            description: _('Define rules for specific windows (one per line, format: action,pattern)')
        });
        
        const rulesRow = new Adw.ActionRow({
            title: _('Window Rules'),
            subtitle: _('Example: float,.*firefox.* or tile,.*terminal.*')
        });
        
        const rulesScrolled = new Gtk.ScrolledWindow({
            height_request: 200,
            hexpand: true
        });
        
        const rulesText = new Gtk.TextView({
            wrap_mode: Gtk.WrapMode.WORD
        });
        const rulesBuffer = rulesText.get_buffer();
        const currentRules = settings.get_string('window-rules');
        rulesBuffer.set_text(currentRules || '', -1);
        
        rulesBuffer.connect('changed', () => {
            const [start, end] = rulesBuffer.get_bounds();
            const text = rulesBuffer.get_text(start, end, false);
            settings.set_string('window-rules', text);
        });
        
        rulesScrolled.set_child(rulesText);
        rulesRow.add_suffix(rulesScrolled);
        rulesGroup.add(rulesRow);
        
        page.add(rulesGroup);
        
        // Keybindings Page
        const keybindingsPage = new Adw.PreferencesPage({
            title: _('Keybindings'),
            icon_name: 'input-keyboard-symbolic'
        });
        
        const keybindingsGroup = new Adw.PreferencesGroup({
            title: _('Window Management'),
            description: _('Configure keyboard shortcuts')
        });
        
        // This is a simplified version - full implementation would allow
        // users to set custom keybindings interactively
        const keybindingsInfo = [
            ['Move Window Left', 'move-window-left', 'Mod4+H'],
            ['Move Window Right', 'move-window-right', 'Mod4+L'],
            ['Move Window Up', 'move-window-up', 'Mod4+K'],
            ['Move Window Down', 'move-window-down', 'Mod4+J'],
            ['Focus Window Left', 'focus-left', 'Mod4+h'],
            ['Focus Window Right', 'focus-right', 'Mod4+l'],
            ['Focus Window Up', 'focus-up', 'Mod4+k'],
            ['Focus Window Down', 'focus-down', 'Mod4+j'],
            ['Toggle Tiling', 'toggle-tiling', 'Mod4+T'],
            ['Toggle Float', 'toggle-float', 'Mod4+F']
        ];
        
        keybindingsInfo.forEach(([title, key, defaultVal]) => {
            const row = new Adw.ActionRow({
                title: title,
                subtitle: defaultVal
            });
            keybindingsGroup.add(row);
        });
        
        keybindingsPage.add(keybindingsGroup);
        
        window.add(page);
        window.add(keybindingsPage);
    }
}

