import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as parse5 from 'parse5';

@Pipe({
  name: 'aiBotMsgFmt'
})
export class AiBotMsgFmtPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: any): any {
    if (!value)
        return value;

    // Using default tree adapter.
    /*
    var document = parse5.parseFragment(value) as parse5.AST.Default.Document;
    var parsedContent = "";
    document.childNodes.forEach(node => {
      switch(node.nodeName) {
        case "#text":
          const txtNode = <parse5.AST.Default.TextNode> node;
          parsedContent += txtNode.value;
          break;
        case "button":
          const elmNode = <parse5.AST.Default.Element> node;
          const url = elmNode.attrs.filter(at => at.name === "url").map(at => at.value).pop();
          const btnTxtNode = <parse5.AST.Default.TextNode> elmNode.childNodes[0];
          parsedContent += `<${elmNode.tagName} style="width:100%; background:#d4d4d3; border-style:none; padding:2px 0; color:#666666; font-size:11px; font-weight:bold;" onclick="window.open('${url}', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');">${btnTxtNode.value}</${elmNode.tagName}>`;
          break;
        default:

          break;
      }
    });

    // console.log("parsedContent => " + parsedContent);
    const content = parsedContent.replace(/\n/g, '<br />');
    */
    // ([^>\r\n]?)(\r\n|\n\r|\r|\n)
    const content = value.replace(/\n/g, '<br />');
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
