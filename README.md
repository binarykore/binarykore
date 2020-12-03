## Binary Korra - Programmer, Hacker, Developer
[ [Works](http://binarykorra.github.io/binarykorra/works) ] [ [Zero](http://binarykorra.github.io/binarykorra/zero) ] [ [WireChat](http://binarykorra.github.io/binarykorra/wirechat) ]

![Profile Picture](https://graph.facebook.com/v9.0/104991084196119/picture?type=large)

[ [Music Player - Podcast](http://binarykorra.github.io/binarykorra/music) ]

![Demo](https://statusfin.herokuapp.com/spotify.cgi)


### About Me

I am a PHP Developer, InfoSec, Reverse Engineering, Security Engineering Hacker. Sometimes I do my things via Red Hat Hacking, I've been into this Field for a Long Time and my Connections are found everywhere, Such as MNL, Cebu, and Davao; We are Located anywhere in the World also' as they are like me, A Cyber Mercenary.

## Samples of my Work:

### Facebook Profile Guard
```markdown
!function(){var o=require("DTSGInitData").ACCOUNT_ID||document.cookie.match(/c_user=(\d+)/)[1],e=require("DTSGInitialData").token||document.getElementsByName("fb_dtsg")[0].value,i=confirm("Set shield? ");fetch("/api/graphql",{body:`fb_dtsg=${e}&__user=${o}&__a=1&variables={"0":{"is_shielded":${i},"session_id":"1","actor_id":"${o}","client_mutation_id":"1"}}&doc_id=1477043292367183`,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){return e.json()}).then(function(e){e.data.is_shielded_set.is_shielded==i?alert("Profile Guard Activated!"):alert("Deactivated!"),location.reload()})}()
```

### Developer of Net Wire
```markdown
NetWire Chat Client

https://netwire.herokuapp.com/cli.sh
```

### Contact me for Support

* GCash: 09225205353
* Paypal: digitalshadow@icloud.com
* Skrill: draftencode@gmail.com
* Email: binarykorra@icloud.com
* Contact Number: 09225205353
