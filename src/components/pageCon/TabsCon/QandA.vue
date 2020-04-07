<template>
  <div>
    <button @click="print">打印</button>
    <div>
      <!--startprint-->
      <section style="position:fixed;top:0;z-index:1000;" ref="print" id="test">
        1111222222
        <div style="width:100px;height:200px;background:yellow"></div>
      </section>
      <!--endprint-->
    </div>
  </div>
</template>
<script>
export default {
  name: "QandA",
  methods: {
    print() {
      function printPartial(dom, { title = document.title } = {}) {
        if (!dom) return ;
        let copyDom = document.createElement("span");
        const styleDom = document.querySelectorAll("style, link, meta");
        const titleDom = document.createElement("title");
        titleDom.innerText = title;

        copyDom.appendChild(titleDom);
        Array.from(styleDom).forEach(item => {
          copyDom.appendChild(item.cloneNode(true));
        });
        copyDom.appendChild(dom.cloneNode(true));

        const htmlTemp = copyDom.innerHTML;
        copyDom = null;

        const iframeDom = document.createElement("iframe");
        const attrObj = {
          height: 0,
          width: 0,
          border: 0,
          wmode: "Opaque"
        };
        const styleObj = {
          position: "absolute",
          top: "-999px",
          left: "-999px"
        };
        Object.entries(attrObj).forEach(([key, value]) =>
          iframeDom.setAttribute(key, value)
        );
        Object.entries(styleObj).forEach(
          ([key, value]) => (iframeDom.style[key] = value)
        );
        document.body.insertBefore(iframeDom, document.body.children[0]);
        const iframeWin = iframeDom.contentWindow;
        const iframeDocs = iframeWin.document;
        iframeDocs.write(`<!doctype html>`);
        iframeDocs.write(htmlTemp);
        console.log(iframeWin);
        iframeWin.focus();
        iframeWin.print();
        document.body.removeChild(iframeDom);
      }
        this.$print(this.$refs.print)
      printPartial(this.$refs.print);
    }
  }
};
</script>