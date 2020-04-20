// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
        { title: 'Peerparty pilot w/ Hackers & Designers',
          slug: 'pp-hd',
          html: '<p><a href="https://www.peerparty.org/">Peerparty</a> a project developed @ Pubkey looking to address current polarizing online discourse in our society by exposing moments of consensus in conversations on complicated subjects online concluded it’s first successful 1 week pilot with <a href="https://hackersanddesigners.nl">Hackers &amp; Designers</a> this week.</p> <p>Peerparty publishes the moments of consensus from the curated and hosted discussions on it’s <a href="https://www.peerparty.org/blog.html">blog</a>.</p> <p>Peerparty is a publishing and community platform approach leveraging consensus as a discourse mechanism for online threaded conversations. Current platforms and methodologies leverage traditional “majority wins” democratic voting mechanisms where only the most popular opinions by select influencers gain exposure, see Reddit (reddit.com), Hacker News (news.ycombinator.com), etc..</p> <p>The hypothesis is that such algorithms have bred a divisive culture of extremist statements from a few highly influential individuals distancing participant positions from one another, and that a consensus based algorithm is a viable alternative.</p> <p>The Peerparty algorithmic approach looks for moments in threaded conversation where consensus has occurred, and alternatively brings these comments to the top of conversation threads. The algorithm is based on consensus and inspired simultaneously by digital algorithms like paxos, flat hierarchical social organizational structures like occupy, holacracy and sociocracy, anarchist philosophy, the squatting movement and the Dutch polder model.</p> <p><a href="https://jamesbryangraves.com">JBG</a>, Sun 19 Apr 2020 05:23:32 PM CEST</p>'
        },
	{ title: 'Dummy webcam (v4l2, ffmpeg & filters)',
	  slug: 'v4l2-ffmpeg',
	  html: '<p>It was on my todo list for weeks, ever since the COVID-19 pandemic kicked off to create a dummy webcam device on my Linux box to fool Zoom, Jitsi, Google Meet, Teams, etc.., into streaming whatever I like: videos of me paying attention when I\'m not, films, or gliched out filters. It\'s 3 simple commands around v4l2loopback and ffmpeg. I thought I would share them here.</p><img src="/blog/ffmpeg.jpg"> <h2 id="setup-the-v4l2loopback-device">Setup the v4l2loopback device</h2> <pre><code>$ sudo modprobe v4l2loopback exclusive_caps=1</code></pre> <h2 id="get-the-device-name-in-my-case-devvideo2">Get the device name (in my case /dev/video2)</h2> <pre><code>$ v4l2-ctl --list-devices</code></pre> <h1 id="now-the-fun-stuff-examples">Now the fun stuff (Examples)</h1> <h2 id="stream-the-matrix">Stream an mp4</h2> <pre><code>$  ffmpeg -re -i matrix.mp4 -vcodec rawvideo -pix_fmt yuv420p -threads 0 -f v4l2 /dev/video2</code></pre> <h2 id="glitches-filters">Glitches &amp; Filters</h2> <pre><code>$ ffmpeg -f v4l2 -framerate 60 -video_size 1280x720 -input_format mjpeg -i /dev/video0 -filter_complex &quot;scale=w=iw/20:h=ih/20, datascope=s=1280x720:mode=color2&quot; -vcodec rawvideo -pix_fmt yuv420p -threads 0 -f v4l2 /dev/video2</code></pre> <p>More ffmpeg filter examples <a href="https://ffmpeg.org/ffmpeg-filters.html">here</a> and <a href="https://trac.ffmpeg.org/wiki/FilteringGuide">here</a>.</p> <p><a href="https://jamesbryangraves.com">JBG</a>, Thu 16 Apr 2020 02:03:34 PM CEST</p>'
	},
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;
