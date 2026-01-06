/* Preferences UI for hypr-GNOME Extension */

import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';
import Gdk from 'gi://Gdk';
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
        
        // Theming section
        const themingRow = new Adw.ActionRow({
            title: _('Enable Theming'),
            subtitle: _('Customize Top Bar, Menus, and Dash appearance')
        });
        
        const themingSwitch = new Gtk.Switch({
            active: settings.get_boolean('enable-theming'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('enable-theming', themingSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        themingRow.add_suffix(themingSwitch);
        themingRow.activatable_widget = themingSwitch;
        group.add(themingRow);
        
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
        
        // Theming Pages
        this._addThemingPages(window, settings);
        
        // Import/Export Page
        this._addImportExportPage(window, settings);
        
        window.add(page);
        window.add(keybindingsPage);
    }

    _addThemingPages(window, settings) {
        // Auto-Theming Page
        const autoThemePage = new Adw.PreferencesPage({
            title: _('Auto-Theming'),
            icon_name: 'color-select-symbolic'
        });
        
        const autoThemeGroup = new Adw.PreferencesGroup({
            title: _('Automatic Theme Generation'),
            description: _('Generate themes automatically from your desktop background')
        });
        
        // Enable auto-theming
        const autoThemeEnableRow = new Adw.ActionRow({
            title: _('Enable Auto-Theming'),
            subtitle: _('Automatically generate themes from wallpaper')
        });
        
        const autoThemeEnableSwitch = new Gtk.Switch({
            active: settings.get_boolean('auto-theme-enabled'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('auto-theme-enabled', autoThemeEnableSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        autoThemeEnableRow.add_suffix(autoThemeEnableSwitch);
        autoThemeEnableRow.activatable_widget = autoThemeEnableSwitch;
        autoThemeGroup.add(autoThemeEnableRow);
        
        // Auto-refresh on background change
        const autoRefreshRow = new Adw.ActionRow({
            title: _('Refresh on Background Change'),
            subtitle: _('Update theme when wallpaper changes')
        });
        
        const autoRefreshSwitch = new Gtk.Switch({
            active: settings.get_boolean('auto-theme-refresh'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('auto-theme-refresh', autoRefreshSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        autoRefreshRow.add_suffix(autoRefreshSwitch);
        autoRefreshRow.activatable_widget = autoRefreshSwitch;
        autoThemeGroup.add(autoRefreshRow);
        
        // Theme mode
        const themeModeRow = new Adw.ComboRow({
            title: _('Theme Mode'),
            subtitle: _('Color treatment for auto-generated themes'),
            model: Gtk.StringList.new(['True Color', 'Pastel', 'Dark', 'Light'])
        });
        const themeModeMap = ['true-color', 'pastel', 'dark', 'light'];
        const currentMode = settings.get_string('auto-theme-mode');
        const modeIndex = themeModeMap.indexOf(currentMode);
        if (modeIndex >= 0) {
            themeModeRow.set_selected(modeIndex);
        }
        themeModeRow.connect('notify::selected', (row) => {
            settings.set_string('auto-theme-mode', themeModeMap[row.selected]);
        });
        autoThemeGroup.add(themeModeRow);
        
        // Generate theme button
        const generateRow = new Adw.ActionRow({
            title: _('Generate Theme Now'),
            subtitle: _('Create theme from current background')
        });
        
        const generateButton = new Gtk.Button({
            label: _('Generate'),
            valign: Gtk.Align.CENTER
        });
        generateButton.connect('clicked', () => {
            // Trigger theme generation
            settings.set_boolean('auto-theme-trigger', !settings.get_boolean('auto-theme-trigger'));
        });
        generateRow.add_suffix(generateButton);
        autoThemeGroup.add(generateRow);
        
        autoThemePage.add(autoThemeGroup);
        window.add(autoThemePage);
        
        // Top Bar/Panel Theming Page
        const panelPage = new Adw.PreferencesPage({
            title: _('Top Bar & Panel'),
            icon_name: 'view-grid-symbolic'
        });
        
        const panelGroup = new Adw.PreferencesGroup({
            title: _('Panel Appearance'),
            description: _('Customize the top bar/panel style')
        });
        
        // Enable panel theming
        const panelEnableRow = new Adw.ActionRow({
            title: _('Enable Panel Theming'),
            subtitle: _('Apply custom styling to the top panel')
        });
        
        const panelEnableSwitch = new Gtk.Switch({
            active: settings.get_boolean('theme-panel-enable'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('theme-panel-enable', panelEnableSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        panelEnableRow.add_suffix(panelEnableSwitch);
        panelEnableRow.activatable_widget = panelEnableSwitch;
        panelGroup.add(panelEnableRow);
        
        // Panel type
        const panelTypeRow = new Adw.ComboRow({
            title: _('Panel Type'),
            subtitle: _('Choose panel style'),
            model: Gtk.StringList.new(['Fixed', 'Floating', 'Islands'])
        });
        const panelTypeMap = ['fixed', 'floating', 'islands'];
        const currentType = settings.get_string('theme-panel-type');
        const typeIndex = panelTypeMap.indexOf(currentType);
        if (typeIndex >= 0) {
            panelTypeRow.set_selected(typeIndex);
        }
        panelTypeRow.connect('notify::selected', (row) => {
            settings.set_string('theme-panel-type', panelTypeMap[row.selected]);
        });
        panelGroup.add(panelTypeRow);
        
        // Panel background color
        const panelBgRow = this._createColorRow(
            _('Background Color'),
            _('Panel background color'),
            'theme-panel-bg-color',
            settings
        );
        panelGroup.add(panelBgRow);
        
        // Panel background alpha
        const panelAlphaRow = this._createSliderRow(
            _('Background Transparency'),
            _('Panel background opacity'),
            'theme-panel-bg-alpha',
            settings,
            0.0,
            1.0,
            0.05
        );
        panelGroup.add(panelAlphaRow);
        
        // Panel foreground color
        const panelFgRow = this._createColorRow(
            _('Foreground Color'),
            _('Text and icon color'),
            'theme-panel-fg-color',
            settings
        );
        panelGroup.add(panelFgRow);
        
        // Panel height
        const panelHeightRow = this._createSpinRow(
            _('Panel Height'),
            _('Height in pixels'),
            'theme-panel-height',
            settings,
            20,
            100,
            1
        );
        panelGroup.add(panelHeightRow);
        
        // Panel border radius
        const panelRadiusRow = this._createSpinRow(
            _('Border Radius'),
            _('Rounded corners (0 = rectangular, high = pill)'),
            'theme-panel-radius',
            settings,
            0,
            50,
            1
        );
        panelGroup.add(panelRadiusRow);
        
        // Panel border
        const panelBorderWidthRow = this._createSpinRow(
            _('Border Width'),
            _('Panel border thickness'),
            'theme-panel-border-width',
            settings,
            0,
            10,
            1
        );
        panelGroup.add(panelBorderWidthRow);
        
        const panelBorderColorRow = this._createColorRow(
            _('Border Color'),
            _('Panel border color'),
            'theme-panel-border-color',
            settings
        );
        panelGroup.add(panelBorderColorRow);
        
        panelPage.add(panelGroup);
        window.add(panelPage);
        
        // Menu Theming Page
        const menuPage = new Adw.PreferencesPage({
            title: _('Menus'),
            icon_name: 'open-menu-symbolic'
        });
        
        const menuGroup = new Adw.PreferencesGroup({
            title: _('Menu Appearance'),
            description: _('Style Calendar, Notifications, and Quick Settings menus')
        });
        
        // Enable menu theming
        const menuEnableRow = new Adw.ActionRow({
            title: _('Enable Menu Theming'),
            subtitle: _('Apply custom styling to menus')
        });
        
        const menuEnableSwitch = new Gtk.Switch({
            active: settings.get_boolean('theme-menu-enable'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('theme-menu-enable', menuEnableSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        menuEnableRow.add_suffix(menuEnableSwitch);
        menuEnableRow.activatable_widget = menuEnableSwitch;
        menuGroup.add(menuEnableRow);
        
        // Menu background
        const menuBgRow = this._createColorRow(
            _('Menu Background'),
            _('Background color for menus'),
            'theme-menu-bg-color',
            settings
        );
        menuGroup.add(menuBgRow);
        
        const menuAlphaRow = this._createSliderRow(
            _('Menu Transparency'),
            _('Menu background opacity'),
            'theme-menu-bg-alpha',
            settings,
            0.0,
            1.0,
            0.05
        );
        menuGroup.add(menuAlphaRow);
        
        // Menu foreground
        const menuFgRow = this._createColorRow(
            _('Menu Foreground'),
            _('Text color in menus'),
            'theme-menu-fg-color',
            settings
        );
        menuGroup.add(menuFgRow);
        
        // Menu border radius
        const menuRadiusRow = this._createSpinRow(
            _('Menu Border Radius'),
            _('Rounded corners for menus'),
            'theme-menu-radius',
            settings,
            0,
            30,
            1
        );
        menuGroup.add(menuRadiusRow);
        
        menuPage.add(menuGroup);
        window.add(menuPage);
        
        // Dash/Dock Theming Page
        const dashPage = new Adw.PreferencesPage({
            title: _('Dash & Dock'),
            icon_name: 'view-grid-symbolic'
        });
        
        const dashGroup = new Adw.PreferencesGroup({
            title: _('Dash/Dock Appearance'),
            description: _('Customize the application dash/dock')
        });
        
        // Enable dash theming
        const dashEnableRow = new Adw.ActionRow({
            title: _('Enable Dash Theming'),
            subtitle: _('Apply custom styling to the dash')
        });
        
        const dashEnableSwitch = new Gtk.Switch({
            active: settings.get_boolean('theme-dash-enable'),
            valign: Gtk.Align.CENTER
        });
        settings.bind('theme-dash-enable', dashEnableSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
        dashEnableRow.add_suffix(dashEnableSwitch);
        dashEnableRow.activatable_widget = dashEnableSwitch;
        dashGroup.add(dashEnableRow);
        
        // Dash background
        const dashBgRow = this._createColorRow(
            _('Dash Background'),
            _('Background color for dash'),
            'theme-dash-bg-color',
            settings
        );
        dashGroup.add(dashBgRow);
        
        const dashAlphaRow = this._createSliderRow(
            _('Dash Transparency'),
            _('Dash background opacity'),
            'theme-dash-bg-alpha',
            settings,
            0.0,
            1.0,
            0.05
        );
        dashGroup.add(dashAlphaRow);
        
        // Dash border radius
        const dashRadiusRow = this._createSpinRow(
            _('Dash Border Radius'),
            _('Rounded corners for dash'),
            'theme-dash-radius',
            settings,
            0,
            30,
            1
        );
        dashGroup.add(dashRadiusRow);
        
        dashPage.add(dashGroup);
        window.add(dashPage);
    }

    _addImportExportPage(window, settings) {
        const importExportPage = new Adw.PreferencesPage({
            title: _('Import & Export'),
            icon_name: 'document-export-symbolic'
        });
        
        const importExportGroup = new Adw.PreferencesGroup({
            title: _('Theme Settings'),
            description: _('Save or load your theme configuration')
        });
        
        // Export button
        const exportRow = new Adw.ActionRow({
            title: _('Export Settings'),
            subtitle: _('Save current theme settings to a file')
        });
        
        const exportButton = new Gtk.Button({
            label: _('Export'),
            valign: Gtk.Align.CENTER
        });
        exportButton.connect('clicked', () => {
            this._exportSettings(settings);
        });
        exportRow.add_suffix(exportButton);
        importExportGroup.add(exportRow);
        
        // Import button
        const importRow = new Adw.ActionRow({
            title: _('Import Settings'),
            subtitle: _('Load theme settings from a file')
        });
        
        const importButton = new Gtk.Button({
            label: _('Import'),
            valign: Gtk.Align.CENTER
        });
        importButton.connect('clicked', () => {
            this._importSettings(settings);
        });
        importRow.add_suffix(importButton);
        importExportGroup.add(importRow);
        
        importExportPage.add(importExportGroup);
        window.add(importExportPage);
    }

    _createColorRow(title, subtitle, key, settings) {
        const row = new Adw.ActionRow({
            title: title,
            subtitle: subtitle
        });
        
        const colorButton = new Gtk.ColorButton({
            valign: Gtk.Align.CENTER
        });
        const currentColor = settings.get_string(key);
        if (currentColor) {
            const rgba = new Gdk.RGBA();
            rgba.parse(currentColor);
            colorButton.set_rgba(rgba);
        }
        colorButton.connect('color-set', (btn) => {
            const rgba = btn.get_rgba();
            const hex = `#${Math.floor(rgba.red * 255).toString(16).padStart(2, '0')}${Math.floor(rgba.green * 255).toString(16).padStart(2, '0')}${Math.floor(rgba.blue * 255).toString(16).padStart(2, '0')}`;
            settings.set_string(key, hex);
        });
        row.add_suffix(colorButton);
        row.activatable_widget = colorButton;
        
        return row;
    }

    _createSliderRow(title, subtitle, key, settings, min, max, step) {
        const row = new Adw.ActionRow({
            title: title,
            subtitle: subtitle
        });
        
        const scale = new Gtk.Scale({
            orientation: Gtk.Orientation.HORIZONTAL,
            adjustment: new Gtk.Adjustment({
                lower: min,
                upper: max,
                step_increment: step,
                value: settings.get_double(key)
            }),
            draw_value: true,
            digits: 2,
            valign: Gtk.Align.CENTER,
            width_request: 200
        });
        settings.bind(key, scale.get_adjustment(), 'value', Gio.SettingsBindFlags.DEFAULT);
        row.add_suffix(scale);
        
        return row;
    }

    _createSpinRow(title, subtitle, key, settings, min, max, step) {
        const row = new Adw.ActionRow({
            title: title,
            subtitle: subtitle
        });
        
        const spin = new Gtk.SpinButton({
            adjustment: new Gtk.Adjustment({
                lower: min,
                upper: max,
                step_increment: step,
                value: settings.get_int(key)
            }),
            valign: Gtk.Align.CENTER
        });
        settings.bind(key, spin, 'value', Gio.SettingsBindFlags.DEFAULT);
        row.add_suffix(spin);
        row.activatable_widget = spin;
        
        return row;
    }

    _exportSettings(settings) {
        // Simplified export - would serialize all settings
        const dialog = new Gtk.FileChooserDialog({
            title: _('Export Settings'),
            action: Gtk.FileChooserAction.SAVE,
            modal: true
        });
        dialog.add_button(_('Cancel'), Gtk.ResponseType.CANCEL);
        dialog.add_button(_('Save'), Gtk.ResponseType.ACCEPT);
        
        const filter = new Gtk.FileFilter();
        filter.add_pattern('*.json');
        dialog.add_filter(filter);
        
        dialog.connect('response', (dialog, response) => {
            if (response === Gtk.ResponseType.ACCEPT) {
                const file = dialog.get_file();
                // Export logic here
                log('Export settings to: ' + file.get_path());
            }
            dialog.destroy();
        });
        
        dialog.show();
    }

    _importSettings(settings) {
        // Simplified import - would load settings from file
        const dialog = new Gtk.FileChooserDialog({
            title: _('Import Settings'),
            action: Gtk.FileChooserAction.OPEN,
            modal: true
        });
        dialog.add_button(_('Cancel'), Gtk.ResponseType.CANCEL);
        dialog.add_button(_('Open'), Gtk.ResponseType.ACCEPT);
        
        const filter = new Gtk.FileFilter();
        filter.add_pattern('*.json');
        dialog.add_filter(filter);
        
        dialog.connect('response', (dialog, response) => {
            if (response === Gtk.ResponseType.ACCEPT) {
                const file = dialog.get_file();
                // Import logic here
                log('Import settings from: ' + file.get_path());
            }
            dialog.destroy();
        });
        
        dialog.show();
    }
}

