# Store Screenshot Plan — Let Them Eat Cookies

**Status: NOT YET CAPTURED. Genuine blocker, not an oversight.** The visual redesign (feminine
porcelain/raspberry palette, corrected navigation) and the 52-cookie catalog are both now in
place, so this is the first point where screenshots would actually represent the finished product
— but capturing real App Store screenshots requires an iOS Simulator or physical device at the
exact required resolutions, and this environment has no macOS/Xcode available (the same constraint
that blocks a local `xcodebuild archive`). The in-browser preview tool used throughout this
project's QA also failed to produce screenshots in this session specifically (a tooling issue, not
a visual defect — extensively cross-verified via DOM/computed-style checks instead throughout this
pass). Per explicit instruction, these were **not faked, stretched, or approximated** from a
browser viewport — do that from an actual Simulator/device once one is available, using the shot
list below.

Planned screenshot set:

1. Main page hero + Cookie of the Day — leads with the new palette and photography-forward hero band
2. Cookie Encyclopedia grid — "Browse 52 cookies from traditions around the world," A–Z index visible
3. Cookie detail page + Recipe — hero photo, at-a-glance recipe strip, and grouped ingredients in one frame
4. Workshop hub — photo header + refined card grid (Cookie Anatomy, Build a Cookie, Labs)
5. Sommelier FIND results — photographic match cards with score and reasoning
6. Atlas — region chips + photographic per-cookie rows, ideally showing the new Scandinavia region

Once native builds exist, capture at standard iPhone (6.7", 6.5") and iPad sizes for App Store, and
phone/tablet sizes for Play Console, per each store's current required-size table.
