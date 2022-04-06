
const WEBRING_DATA = `https://netescape.neocities.org/ring.json`;

const template = document.createElement("template");
template.innerHTML = `
<style>
 
 .outer {
  background-color:var(--bgcolor);
  border-top:var(--bordertop);
  border-left:var(--borderleft);
  border-bottom:var(--borderottom);
  border-right:var(--borderright);
  width:var(--mywidth);
  height:var(--myheight);
  text-align: center
}
  
p {
  color: var(--pcolor);
  font-family: var(--pfamily);
  margin: var(--pmargin);
  font-size: var(--psize);
}

h1 {
  color: var(--h1color);
  font-family: var(--h1family);
  margin: var(--h1margin);
  font-size: var(--h1size);
}

.header {
  width: 100%;
  background-color:var(--headerbg);
}

.img {
  display: block;
}

</style>

<div class="outer">
  <div id="inner">

  </div>
</div>`;

class Ring extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // e.g. https://css-tricks.com
    const thisSite = this.getAttribute("site"); 
    
    fetch(WEBRING_DATA)
      .then((response) => response.json())
      .then((sites) => {
        // Find the current site in the data
        const matchedSiteIndex = sites.findIndex(
          (site) => site.url === thisSite
        );
        
        const matchedSite = sites[matchedSiteIndex];

        let prevSiteIndex = matchedSiteIndex - 1;
        if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;

        let nextSiteIndex = matchedSiteIndex + 1;
        if (nextSiteIndex > sites.length - 1) nextSiteIndex = 0;
        
        //console.log("sites[0].url is " + sites[0].url);
        //console.log("matchedSite.url is " + matchedSite.url);
        //console.log("matchedSite.name is " + matchedSite.name);
        //console.log(sites[0].url);

        const randomSiteIndex = this.getRandomInt(0, sites.length - 1);

        const cp = ` <img class="header" src="https://netescape.neocities.org/images/assets/ringheader.png"><br>
        <h1><img src="https://netescape.neocities.org/images/assets/logo.png" width="20"> The NetEscape Webring</h1>
        
        <p><strong>${matchedSite.owner}</strong> is taking back the internet one webpage at a time</p>
        
        <div class="img">
        <a href="${sites[prevSiteIndex].url}"><img src="https://netescape.neocities.org/images/assets/back.png"></a><a href="${sites[randomSiteIndex].url}"><img src="https://netescape.neocities.org/images/assets/rand.png"></a><a href="https://netescape.neocities.org"><img src="https://netescape.neocities.org/images/assets/home.png"></a><a href="${sites[nextSiteIndex].url}"><img src="https://netescape.neocities.org/images/assets/forw.png"></a>
        </div>
        `;

        this.shadowRoot
          .querySelector("#inner")
          .insertAdjacentHTML("afterbegin", cp);
      });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.customElements.define("ring-css", Ring);

        // Get HTML head element 
        var head = document.getElementsByTagName('HEAD')[0];  
  
        // Create new link Element 
        var link = document.createElement('link'); 
  
        // set the attributes for link element  
        link.rel = 'stylesheet';  
      
        link.type = 'text/css'; 
      
        link.href = 'https://netescape.neocities.org/ring.css';  
  
        // Append link element to HTML head 
        head.appendChild(link);  