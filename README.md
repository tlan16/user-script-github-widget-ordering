# GitHub Widget Reorder

A userscript that reorders GitHub repository sidebar widgets by moving the "Languages" section to the top for easier access.

## Description

This userscript automatically moves the "Languages" widget to the top of the sidebar on GitHub repository pages. This provides quicker access to language statistics without having to scroll through other widgets.

## Features

- 🚀 **Automatic Reordering**: Moves the Languages widget to the top of the sidebar on page load
- 🔄 **Turbo Navigation Support**: Works seamlessly with GitHub's Turbo navigation (no page refresh needed)
- 🎯 **Smart Detection**: Uses XPath to reliably locate the Languages widget
- 🛡️ **Idempotent**: Safely handles multiple runs without duplicate operations
- 🐛 **Debug-Friendly**: All logs are prefixed with `[GitHub Widget Reorder]` for easy debugging

## Installation

### Prerequisites

You need a userscript manager extension installed in your browser:

- [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge, Opera)
- [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)
- [Greasemonkey](https://www.greasespot.net/) (Firefox)

### Install the Script

1. Install a userscript manager from the list above
2. Click on this link: [Install GitHub Widget Reorder](https://github.com/tlan16/user-script-github-widget-ordering/raw/main/script.user.js)
3. Your userscript manager should prompt you to install the script
4. Confirm the installation

Alternatively, you can manually copy the contents of `script.user.js` and create a new script in your userscript manager.

## Supported Sites

The script runs on the following domains:
- `https://github.com/*`
- `https://git.realestate.com.au/*`
- `https://www.property.com.au/*`

## How It Works

1. **Initialization**: The script runs at document-start to be ready as early as possible
2. **Detection**: Uses XPath to locate the Languages widget in the repository sidebar
3. **Reordering**: Moves the Languages widget to the first position in the sidebar
4. **Navigation Handling**: Listens for Turbo navigation events to reapply on page changes
5. **Safety Checks**: Marks moved elements to prevent duplicate operations

### Technical Details

- **Polling Mechanism**: Uses a `waitFor()` utility that polls every 300ms (up to 30 seconds) until the required elements are found
- **DOM Manipulation**: Uses `insertBefore()` to move the widget without cloning or recreating elements
- **Event Handling**: Hooks into GitHub's `turbo:load` event for single-page navigation support

## Development

### Project Structure

```
.
├── script.user.js    # Main userscript file
└── README.md         # This file
```

### Modifying the Script

1. Clone the repository:
   ```bash
   git clone git@github.com:tlan16/user-script-github-widget-ordering.git
   cd user-script-github-widget-ordering
   ```

2. Edit `script.user.js` with your changes

3. To test locally, copy the script content into your userscript manager or use the manager's external editor feature

### Key Functions

- `waitFor(condition, callback, options)` - Polls until a condition is met
- `condition()` - Checks if both the sidebar and Languages widget exist
- `action()` - Performs the widget reordering
- `move_language_widget_to_top(side_nav, language_element)` - Moves the widget to the top position
- `find_language_element_side_nav_row()` - Locates the Languages widget using XPath
- `find_side_nav()` - Finds the sidebar container element

## Troubleshooting

### The widget doesn't move

1. Check the browser console for `[GitHub Widget Reorder]` prefixed logs
2. Ensure you're on a GitHub repository page (not a user profile or organization page)
3. Verify the Languages widget exists on the page (some repositories may not have it)
4. Try refreshing the page

### Console errors

If you see timeout errors, the page structure may have changed. Please [open an issue](https://github.com/tlan16/user-script-github-widget-ordering/issues).

## Updates

The script supports automatic updates through your userscript manager. It will check for updates from the main repository branch.

- **Update URL**: `https://github.com/tlan16/user-script-github-widget-ordering/raw/main/script.user.js`
- **Download URL**: `https://github.com/tlan16/user-script-github-widget-ordering/raw/main/script.user.js`

## License

GPL-3.0 License - See the script header for details.

## Author

**Frank Lan**

- GitHub: [@tlan16](https://github.com/tlan16)
- Repository: [user-script-github-widget-ordering](https://github.com/tlan16/user-script-github-widget-ordering)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for bugs, feature requests, or improvements.

## Changelog

### v1.1
- Current version
- Includes Turbo navigation support and improved element detection

## Support

For bug reports, feature requests, or general questions:
- Open an issue on the [GitHub repository](https://github.com/tlan16/user-script-github-widget-ordering/issues)
- Check existing issues to see if your problem has already been reported