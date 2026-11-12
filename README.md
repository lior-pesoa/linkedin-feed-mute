# Feed Mute for LinkedIn

A small Chrome extension that hides LinkedIn feed posts mentioning keywords you choose.

Add a word in the popup and every post in your feed that contains it disappears, including posts that load as you scroll. Remove the word and the posts come back.

More about it: https://www.liorpesoa.com/linkedin-feed-mute

## Not on the Chrome Web Store

This extension isn't published on the Chrome Web Store and hasn't been reviewed by Google. You install it yourself in Developer mode. It's about 150 lines of plain JavaScript, so you can read all of it before you do.

## Install

1. [Download the zip](https://github.com/lior-pesoa/linkedin-feed-mute/archive/refs/heads/main.zip) and unzip it, or clone this repository.
2. Open `chrome://extensions`.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and pick the unzipped folder.
5. Reload LinkedIn, click the extension's icon and add your keywords.

It doesn't update itself. To update, download it again and click the reload icon on the extension's card.

## How matching works

- Keywords match whole words and ignore case: `crypto` hides "Crypto" but not "cryptography".
- The whole post is checked, including the author's name and headline. Muting a company name also hides posts from people who list it as their employer.
- Posts are hidden in your browser only. Nothing is reported to LinkedIn and nobody is unfollowed or blocked.

## Privacy

The extension makes no network requests and has no analytics. It runs only on `linkedin.com` and uses one permission, `storage`, to save your keyword list in your Chrome profile.

## If it stops working

LinkedIn changes its page markup from time to time, and the extension finds posts by that markup. If posts stop being hidden, [open an issue](https://github.com/lior-pesoa/linkedin-feed-mute/issues).

## Note on LinkedIn's terms

LinkedIn's terms don't allow third-party extensions that change how the site looks. This one only hides posts on your own screen, but use it at your own discretion.

## License

MIT. Not affiliated with, endorsed by, or sponsored by LinkedIn Corporation. "LinkedIn" is a trademark of its owner.
