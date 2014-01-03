--- Lizenzen: ---

Alle verwendeten Scripts, Player oder Elemente  externer Quellen (v.a. Jquery, JW Player, swfobject...) müssen von ebendort runtergeladen werden.
Benutzer muessen selbst sicherstellen, dass Sie die jeweiligen Rechte besitzen.
Das Framework selbst unterliegt GNU General Public License.

--- Installation: ---

1. Playerpaket auf einem Server uploaden und entzippen

2. Download jw player
http://www.longtailvideo.com/players/jw-flv-player/
- Playerfile ablegen unter video/player (player.swf)

3. Download oder Link auf jquery im HTML Head
http://jquery.com/

4. Download oder Link auf swfobject im HTML Head
http://code.google.com/p/swfobject/

5. Download Colorbox und verlinken im HTML Head
http://colorpowered.com/colorbox/
- Files ablegen unter video/colorbox (jquery.colorbox.js, colorbox.css, images)

6. in HTML File z.b. testjq.html 
- Meta Pfade kontrollieren und ggf. ändern
- Javascript Config: Pfade kontrollieren und ggf. ändern (z.b. zu den testfiles)

--- Konfiguration: ----

video/css/video.css
- Videogrößen
- Erweiterte Filmsteuerung anpassen

video/skin/...
- Player Skin

HTML Head Config Javascript:
- playerUrl: default (eher nicht zu aendern)
- playerSkin: Pfad zum player skin
- playerWidth: Breite des Videos im Verhältnis zum umgebenden Container (video.css)
- playerHeight: Hoehe des Videos  im Verhältnis zum umgebenden Container (video.css)
- playerWidthBig: Breite des Grossformatvideos (wenn vorhanden) im Verhältnis zum umgebenden Container (video.css)
- playerHeightBig: Hoehe des des Grossformatvideos (wenn vorhanden) im Verhältnis zum umgebenden Container (video.css)	

- playerFlv: Video Url
- playerFlvBig: Grossformatvideo Url
- playerFlvImg: Vorschaubild

- currentVolume: Default Lautstaerke Audiospur des Videos
- accessibilityPluginsPath: Accessibilityplugins JW Player (eher nicht zu aendern)
- accessibilityPluginsCapsOnlyPath: Accessibilityplugins JW Player (eher nicht zu aendern)
- accessibilityPluginsAudioOnlyPath: Accessibilityplugins JW Player (eher nicht zu aendern)
	
- audioButton: Wenn Audidescription File vorhanden dann auf "on" setzen (on, off)
- audioDescFile: Audidescription File Url
- audioDescVolume: Audidescription Lautstaerke

- captionButton: Wenn Caption File vorhanden dann auf "on" setzen (on, off)
- captionFile: Caption File Url
- captionBackground: Caption Hintergrund (true, false)

- signButton: Wenn Gebaerdensprachvideo File als Medienalternative vorhanden dann auf "on" setzen (on, off)		
- signLanguageUrl: Gebaerdensprachvideo File Url
- signLanguageImg: Gebaerdensprachvideo Vorschaubild

--- Weitere Infos: ----

- Je nach Flash Einstellung ist es möglich, dass das Paket lokal (ohne Server) nicht laeuft (vor allem das Video). 


