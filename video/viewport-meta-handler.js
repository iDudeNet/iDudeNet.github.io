<style>
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    overflow: hidden !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    background: black !important;
  }

  body {
    transform-origin: top left !important;
    transition: transform 0.2s ease !important;
  }
</style>

<body>
  <!-- Your content directly inside body here -->
</body>

<script>
  function scaleApp() {
    const width = window.innerWidth;
    const height = window.innerHeight;
	console.log("innerWidth", width);
    const designWidth = 1920;
    const designHeight = 1080;

    const scaleX = width / designWidth;
    const scaleY = height / designHeight;
    const scale = Math.min(scaleX, scaleY);

    document.body.style.setProperty('transform', `scale(${scale})`, 'important');
  }

  window.addEventListener('load', scaleApp);
  window.addEventListener('resize', scaleApp);
</script>




