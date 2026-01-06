# Makefile for hypr-GNOME extension

UUID := hypr-gnome@hyprland.com
EXTENSION_DIR := ~/.local/share/gnome-shell/extensions/$(UUID)
SCHEMA_DIR := schemas

.PHONY: install uninstall enable disable reload zip clean

install:
	@echo "Installing extension..."
	@mkdir -p $(EXTENSION_DIR)
	@cp -r extension.js metadata.json prefs.js stylesheet.css schemas $(EXTENSION_DIR)/
	@glib-compile-schemas $(EXTENSION_DIR)/schemas/
	@echo "Extension installed to $(EXTENSION_DIR)"
	@echo "Restart GNOME Shell or run 'make enable' to activate"

uninstall:
	@echo "Uninstalling extension..."
	@rm -rf $(EXTENSION_DIR)
	@echo "Extension uninstalled"

enable:
	@gnome-extensions enable $(UUID)
	@echo "Extension enabled"

disable:
	@gnome-extensions disable $(UUID)
	@echo "Extension disabled"

reload:
	@echo "Reloading extension..."
	@gnome-extensions reload $(UUID)
	@echo "Extension reloaded"

zip:
	@echo "Creating extension zip..."
	@zip -r hypr-gnome@hyprland.com.zip extension.js metadata.json prefs.js stylesheet.css schemas README.md Makefile
	@echo "Created hypr-gnome@hyprland.com.zip"

clean:
	@rm -f *.zip
	@echo "Cleaned build artifacts"

