<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  let open = false;
  let btn: HTMLButtonElement | null = null;
  let nav: HTMLElement | null = null;

  function toggle(): void {
    open = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function handleDocClick(e: MouseEvent): void {
    if (!open) return;
    const target = e.target as Node;
    if (!btn || !nav) return;
    if (btn.contains(target) || nav.contains(target)) return;
    toggle();
  }
    function navClick(href: string, e: MouseEvent) {
      // allow regular navigation for different pages
      if (href === location.pathname || href === location.pathname + location.search) {
        e.preventDefault(); // don't reload same page
        if (open) toggle();
      } else {
        // let the browser navigate — close menu for SPA navigation if desired
        // for full reloads do nothing; for SPA use toggle() then programmatic nav
        if (open) toggle();
      }
    }

  onMount(() => {
    document.addEventListener('click', handleDocClick);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleDocClick);
    document.body.style.overflow = '';
  });
</script>

<header class="site-header">
  <button
    bind:this={btn}
    class="hamburger {open ? 'open' : ''}"
    aria-label={open ? 'Close menu' : 'Open menu'}
    aria-expanded={open}
    aria-controls="site-nav"
    onclick={toggle}
    type="button"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>

  <nav
    id="site-nav"
    bind:this={nav}
    class="site-nav {open ? 'open' : ''}"
    aria-hidden={!open}
  >
  <button
      class="nav-close"
      type="button"
      aria-label="Close menu"
      onclick={toggle}
    >
  ✕
</button>
    <ul class="nav-list">
        <li><a href="/" onclick={(e) => navClick('/', e)}>Feats of Strength</a></li>
        <li><a href="/achievements" onclick={(e) => navClick('/achievements', e)}>Achievements</a></li>
        <li><a href="/retrievereport" onclick={(e) => navClick('/retrievereport', e)}>Retrieve Report</a></li>
        <li><a href="/about" onclick={(e) => navClick('/about', e)}>About</a></li>
    </ul>
  </nav>
</header>

<style>
  .site-header{
    display:flex;
    align-items:center;
    justify-content:space-between;
    color:#fff;
    position:relative;
    z-index:50;
    box-sizing:border-box;
  }
  .hamburger{
    --size:44px;
    width:var(--size);
    height:var(--size);
    display:inline-flex;
    align-items:center;
    justify-content:center;
    padding:6px;
    padding-right: 0px;
    border:0;
    background:transparent;
    cursor:pointer;
    -webkit-tap-highlight-color:transparent;
  }

  .hamburger-box{
    width:28px;
    height:18px;
    display:inline-block;
    position:relative;
  }

  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after{
    display:block;
    background:#fff;
    height:2px;
    border-radius:2px;
    position:absolute;
    left:0;
    right:0;
    transition:transform .35s cubic-bezier(.2,.7,.2,1), opacity .2s ease, top .35s cubic-bezier(.2,.7,.2,1);
  }

  .hamburger-inner{
    top:50%;
    transform:translateY(-50%);
  }

  .hamburger-inner::before{
    content:"";
    top:-8px;
  }

  .hamburger-inner::after{
    content:"";
    top:8px;
  }

  .hamburger.open .hamburger-inner{
    transform:rotate(45deg);
  }
  .hamburger.open .hamburger-inner::before{
    transform: translateY(0) rotate(90deg);
    top:50%;
    opacity:0;
  }
  .hamburger.open .hamburger-inner::after{
    top:50%;
    transform: rotate(-90deg);
  }

  .site-nav{
    position:fixed;
    top:0;
    right:0;
    height:100vh;
    width:320px;
    max-width:100%;
    background: #2E2E2E;
    color:#fff;
    padding:80px 24px 24px;
    transform:translateX(110%);
    transition:transform .38s cubic-bezier(.2,.7,.2,1);
    box-shadow: -20px 0 40px rgba(0,0,0,0.5);
    z-index:40;
    overflow:auto;
  }

  .site-nav.open{
    transform:translateX(0);
  }

  .nav-list{
    list-style:none;
    margin:0;
    padding:0;
    display:flex;
    flex-direction:column;
    gap:18px;
  }

  .nav-list a{
    color: #fff;
    text-decoration:none;
    font-size:18px;
    padding:8px 6px;
    display:inline-block;
    transition:color .18s ease, transform .18s ease;
  }

  .nav-list a:hover{
    color:#7be1ff;
    transform:translateX(6px);
  }

  .site-nav[aria-hidden="true"]{
    pointer-events:none;
  }

    .nav-close {
      position:absolute;
      top:12px;           /* distance from top of nav */
      right:12px;         /* distance from right edge of nav */
      width:40px;
      height:40px;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      background:transparent;
      border:0;
      color:#fff;
      font-size:20px;
      cursor:pointer;
      z-index:60;         /* above nav content (nav z-index is 40) */
      -webkit-tap-highlight-color:transparent;
      padding:0;
      line-height:1;
    }

  @media(min-width:900px){
    .hamburger{ display:none; }
    .site-nav{
      position:static;
      height:auto;
      width:auto;
      transform:none;
      background:transparent;
      padding:0;
      box-shadow:none;
    }
    .nav-list{
      flex-direction:row;
      gap:20px;
    }
    .site-header{ padding:16px 48px; }
  }
</style>

