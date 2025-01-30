import{e as Oe,f as je}from"./chunk-SX7ZZS2U.js";import{c as pe,w as Ke,x as Pe}from"./chunk-JDMEAEAD.js";import{I as J,K as Re,L as Le,P as fe,r as Z,z as Be}from"./chunk-U2KESYKC.js";import{$ as P,$b as A,B as oe,Ba as O,Ca as Ne,Fa as ce,G as Ie,Gb as k,Hb as C,Ia as j,Ib as Ae,K as ae,L as de,Lb as q,Nb as X,O as D,Pb as w,R as Te,Rb as Fe,Ub as Se,Vb as Y,Wb as V,Xb as H,_ as le,a as De,aa as R,ab as _,b as be,bb as h,bc as F,ca as L,cc as x,db as ke,dc as S,ga as Q,ia as Me,ib as $,la as U,m as K,n as g,nb as b,ob as E,pa as N,pc as G,qa as W,qc as ue,r as Ee,ra as f,rb as we,t as u,tc as B,uc as I,v as Ce,vb as v,wb as he,x as p,y as z}from"./chunk-FA5KXASZ.js";var ge=class{constructor(){this.expansionModel=new fe(!0)}toggle(t){this.expansionModel.toggle(this._trackByValue(t))}expand(t){this.expansionModel.select(this._trackByValue(t))}collapse(t){this.expansionModel.deselect(this._trackByValue(t))}isExpanded(t){return this.expansionModel.isSelected(this._trackByValue(t))}toggleDescendants(t){this.expansionModel.isSelected(this._trackByValue(t))?this.collapseDescendants(t):this.expandDescendants(t)}collapseAll(){this.expansionModel.clear()}expandDescendants(t){let a=[t];a.push(...this.getDescendants(t)),this.expansionModel.select(...a.map(e=>this._trackByValue(e)))}collapseDescendants(t){let a=[t];a.push(...this.getDescendants(t)),this.expansionModel.deselect(...a.map(e=>this._trackByValue(e)))}_trackByValue(t){return this.trackBy?this.trackBy(t):t}},ee=class extends ge{constructor(t,a,e){super(),this.getLevel=t,this.isExpandable=a,this.options=e,this.options&&(this.trackBy=this.options.trackBy)}getDescendants(t){let a=this.dataNodes.indexOf(t),e=[];for(let i=a+1;i<this.dataNodes.length&&this.getLevel(t)<this.getLevel(this.dataNodes[i]);i++)e.push(this.dataNodes[i]);return e}expandAll(){this.expansionModel.select(...this.dataNodes.map(t=>this._trackByValue(t)))}};var me=new Me("CDK_TREE_NODE_OUTLET_NODE"),te=(()=>{let t=class t{constructor(e,i){this.viewContainer=e,this._node=i}};t.\u0275fac=function(i){return new(i||t)(h($),h(me,8))},t.\u0275dir=f({type:t,selectors:[["","cdkTreeNodeOutlet",""]],standalone:!0});let r=t;return r})(),_e=class{constructor(t){this.$implicit=t}},ie=(()=>{let t=class t{constructor(e){this.template=e}};t.\u0275fac=function(i){return new(i||t)(h(ke))},t.\u0275dir=f({type:t,selectors:[["","cdkTreeNodeDef",""]],inputs:{when:[0,"cdkTreeNodeDefWhen","when"]},standalone:!0});let r=t;return r})();function Ve(){return Error("Could not find a tree control, levelAccessor, or childrenAccessor for the tree.")}var y=(()=>{let t=class t{get dataSource(){return this._dataSource}set dataSource(e){this._dataSource!==e&&this._switchDataSource(e)}constructor(e,i){this._differs=e,this._changeDetectorRef=i,this._dir=U(J),this._onDestroy=new K,this._levels=new Map,this._parents=new Map,this._ariaSets=new Map,this.viewChange=new g({start:0,end:Number.MAX_VALUE}),this._flattenedNodes=new g([]),this._nodeType=new g(null),this._nodes=new g(new Map),this._keyManagerNodes=new g([]),this._keyManagerFactory=U(Be),this._viewInit=!1}ngAfterContentInit(){this._initializeKeyManager()}ngAfterContentChecked(){this._updateDefaultNodeDefinition(),this._subscribeToDataChanges()}ngOnDestroy(){this._nodeOutlet.viewContainer.clear(),this.viewChange.complete(),this._onDestroy.next(),this._onDestroy.complete(),this._dataSource&&typeof this._dataSource.disconnect=="function"&&this.dataSource.disconnect(this),this._dataSubscription&&(this._dataSubscription.unsubscribe(),this._dataSubscription=null),this._keyManager?.destroy()}ngOnInit(){this._checkTreeControlUsage(),this._initializeDataDiffer()}ngAfterViewInit(){this._viewInit=!0}_updateDefaultNodeDefinition(){let e=this._nodeDefs.filter(i=>!i.when);e.length>1,this._defaultNodeDef=e[0]}_setNodeTypeIfUnset(e){this._nodeType.value===null&&this._nodeType.next(e)}_switchDataSource(e){this._dataSource&&typeof this._dataSource.disconnect=="function"&&this.dataSource.disconnect(this),this._dataSubscription&&(this._dataSubscription.unsubscribe(),this._dataSubscription=null),e||this._nodeOutlet.viewContainer.clear(),this._dataSource=e,this._nodeDefs&&this._subscribeToDataChanges()}_getExpansionModel(){return this.treeControl?this.treeControl.expansionModel:(this._expansionModel??=new fe(!0),this._expansionModel)}_subscribeToDataChanges(){if(this._dataSubscription)return;let e;Le(this._dataSource)?e=this._dataSource.connect(this):Ce(this._dataSource)?e=this._dataSource:Array.isArray(this._dataSource)&&(e=u(this._dataSource)),e&&(this._dataSubscription=this._getRenderData(e).pipe(R(this._onDestroy)).subscribe(i=>{this._renderDataChanges(i)}))}_getRenderData(e){let i=this._getExpansionModel();return z([e,this._nodeType,i.changed.pipe(le(null),L(n=>{this._emitExpansionChanges(n)}))]).pipe(P(([n,s])=>s===null?u({renderNodes:n,flattenedNodes:null,nodeType:s}):this._computeRenderingData(n,s).pipe(p(o=>be(De({},o),{nodeType:s})))))}_renderDataChanges(e){if(e.nodeType===null){this.renderNodeChanges(e.renderNodes);return}this._updateCachedData(e.flattenedNodes),this.renderNodeChanges(e.renderNodes),this._updateKeyManagerItems(e.flattenedNodes)}_emitExpansionChanges(e){if(!e)return;let i=this._nodes.value;for(let n of e.added)i.get(n)?._emitExpansionState(!0);for(let n of e.removed)i.get(n)?._emitExpansionState(!1)}_initializeKeyManager(){let e=z([this._keyManagerNodes,this._nodes]).pipe(p(([n,s])=>n.reduce((o,l)=>{let d=s.get(this._getExpansionKey(l));return d&&o.push(d),o},[]))),i={trackBy:n=>this._getExpansionKey(n.data),skipPredicate:n=>!!n.isDisabled,typeAheadDebounceInterval:!0,horizontalOrientation:this._dir.value};this._keyManager=this._keyManagerFactory(e,i)}_initializeDataDiffer(){let e=this.trackBy??((i,n)=>this._getExpansionKey(n));this._dataDiffer=this._differs.find([]).create(e)}_checkTreeControlUsage(){}renderNodeChanges(e,i=this._dataDiffer,n=this._nodeOutlet.viewContainer,s){let o=i.diff(e);!o&&!this._viewInit||(o?.forEachOperation((l,d,c)=>{if(l.previousIndex==null)this.insertNode(e[c],c,n,s);else if(c==null)n.remove(d);else{let m=n.get(d);n.move(m,c)}}),o?.forEachIdentityChange(l=>{let d=l.item;if(l.currentIndex!=null){let c=n.get(l.currentIndex);c.context.$implicit=d}}),this._changeDetectorRef.detectChanges())}_getNodeDef(e,i){if(this._nodeDefs.length===1)return this._nodeDefs.first;let n=this._nodeDefs.find(s=>s.when&&s.when(i,e))||this._defaultNodeDef;return n}insertNode(e,i,n,s){let o=this._getLevelAccessor(),l=this._getNodeDef(e,i),d=this._getExpansionKey(e),c=new _e(e);s??=this._parents.get(d)??void 0,o?c.level=o(e):s!==void 0&&this._levels.has(this._getExpansionKey(s))?c.level=this._levels.get(this._getExpansionKey(s))+1:c.level=0,this._levels.set(d,c.level),(n||this._nodeOutlet.viewContainer).createEmbeddedView(l.template,c,i),T.mostRecentTreeNode&&(T.mostRecentTreeNode.data=e)}isExpanded(e){return!!(this.treeControl?.isExpanded(e)||this._expansionModel?.isSelected(this._getExpansionKey(e)))}toggle(e){this.treeControl?this.treeControl.toggle(e):this._expansionModel&&this._expansionModel.toggle(this._getExpansionKey(e))}expand(e){this.treeControl?this.treeControl.expand(e):this._expansionModel&&this._expansionModel.select(this._getExpansionKey(e))}collapse(e){this.treeControl?this.treeControl.collapse(e):this._expansionModel&&this._expansionModel.deselect(this._getExpansionKey(e))}toggleDescendants(e){this.treeControl?this.treeControl.toggleDescendants(e):this._expansionModel&&(this.isExpanded(e)?this.collapseDescendants(e):this.expandDescendants(e))}expandDescendants(e){if(this.treeControl)this.treeControl.expandDescendants(e);else if(this._expansionModel){let i=this._expansionModel;i.select(this._getExpansionKey(e)),this._getDescendants(e).pipe(D(1),R(this._onDestroy)).subscribe(n=>{i.select(...n.map(s=>this._getExpansionKey(s)))})}}collapseDescendants(e){if(this.treeControl)this.treeControl.collapseDescendants(e);else if(this._expansionModel){let i=this._expansionModel;i.deselect(this._getExpansionKey(e)),this._getDescendants(e).pipe(D(1),R(this._onDestroy)).subscribe(n=>{i.deselect(...n.map(s=>this._getExpansionKey(s)))})}}expandAll(){this.treeControl?this.treeControl.expandAll():this._expansionModel&&this._expansionModel.select(...this._flattenedNodes.value.map(i=>this._getExpansionKey(i)))}collapseAll(){this.treeControl?this.treeControl.collapseAll():this._expansionModel&&this._expansionModel.deselect(...this._flattenedNodes.value.map(i=>this._getExpansionKey(i)))}_getLevelAccessor(){return this.treeControl?.getLevel?.bind(this.treeControl)??this.levelAccessor}_getChildrenAccessor(){return this.treeControl?.getChildren?.bind(this.treeControl)??this.childrenAccessor}_getDirectChildren(e){let i=this._getLevelAccessor(),n=this._expansionModel??this.treeControl?.expansionModel;if(!n)return u([]);let s=this._getExpansionKey(e),o=n.changed.pipe(P(d=>d.added.includes(s)?u(!0):d.removed.includes(s)?u(!1):Ee),le(this.isExpanded(e)));if(i)return z([o,this._flattenedNodes]).pipe(p(([d,c])=>d?this._findChildrenByLevel(i,c,e,1):[]));let l=this._getChildrenAccessor();if(l)return Z(l(e)??[]);throw Ve()}_findChildrenByLevel(e,i,n,s){let o=this._getExpansionKey(n),l=i.findIndex(M=>this._getExpansionKey(M)===o),d=e(n),c=d+s,m=[];for(let M=l+1;M<i.length;M++){let ye=e(i[M]);if(ye<=d)break;ye<=c&&m.push(i[M])}return m}_registerNode(e){this._nodes.value.set(this._getExpansionKey(e.data),e),this._nodes.next(this._nodes.value)}_unregisterNode(e){this._nodes.value.delete(this._getExpansionKey(e.data)),this._nodes.next(this._nodes.value)}_getLevel(e){return this._levels.get(this._getExpansionKey(e))}_getSetSize(e){return this._getAriaSet(e).length}_getPositionInSet(e){let i=this._getAriaSet(e),n=this._getExpansionKey(e);return i.findIndex(s=>this._getExpansionKey(s)===n)+1}_getNodeParent(e){let i=this._parents.get(this._getExpansionKey(e.data));return i&&this._nodes.value.get(this._getExpansionKey(i))}_getNodeChildren(e){return this._getDirectChildren(e.data).pipe(p(i=>i.reduce((n,s)=>{let o=this._nodes.value.get(this._getExpansionKey(s));return o&&n.push(o),n},[])))}_sendKeydownToKeyManager(e){this._keyManager.onKeydown(e)}_getDescendants(e){if(this.treeControl)return u(this.treeControl.getDescendants(e));if(this.levelAccessor){let i=this._findChildrenByLevel(this.levelAccessor,this._flattenedNodes.value,e,1/0);return u(i)}if(this.childrenAccessor)return this._getAllChildrenRecursively(e).pipe(ae((i,n)=>(i.push(...n),i),[]));throw Ve()}_getAllChildrenRecursively(e){return this.childrenAccessor?Z(this.childrenAccessor(e)).pipe(D(1),P(i=>{for(let n of i)this._parents.set(this._getExpansionKey(n),e);return u(...i).pipe(de(n=>oe(u([n]),this._getAllChildrenRecursively(n))))})):u([])}_getExpansionKey(e){return this.expansionKey?.(e)??e}_getAriaSet(e){let i=this._getExpansionKey(e),n=this._parents.get(i),s=n?this._getExpansionKey(n):null;return this._ariaSets.get(s)??[e]}_findParentForNode(e,i,n){if(!n.length)return null;let s=this._levels.get(this._getExpansionKey(e))??0;for(let o=i-1;o>=0;o--){let l=n[o];if((this._levels.get(this._getExpansionKey(l))??0)<s)return l}return null}_flattenNestedNodesWithExpansion(e,i=0){let n=this._getChildrenAccessor();return n?u(...e).pipe(de(s=>{let o=this._getExpansionKey(s);this._parents.has(o)||this._parents.set(o,null),this._levels.set(o,i);let l=Z(n(s));return oe(u([s]),l.pipe(D(1),L(d=>{this._ariaSets.set(o,[...d??[]]);for(let c of d??[]){let m=this._getExpansionKey(c);this._parents.set(m,s),this._levels.set(m,i+1)}}),P(d=>d?this._flattenNestedNodesWithExpansion(d,i+1).pipe(p(c=>this.isExpanded(s)?c:[])):u([]))))}),ae((s,o)=>(s.push(...o),s),[])):u([...e])}_computeRenderingData(e,i){if(this.childrenAccessor&&i==="flat")return this._ariaSets.set(null,[...e]),this._flattenNestedNodesWithExpansion(e).pipe(p(n=>({renderNodes:n,flattenedNodes:n})));if(this.levelAccessor&&i==="nested"){let n=this.levelAccessor;return u(e.filter(s=>n(s)===0)).pipe(p(s=>({renderNodes:s,flattenedNodes:e})),L(({flattenedNodes:s})=>{this._calculateParents(s)}))}else return i==="flat"?u({renderNodes:e,flattenedNodes:e}).pipe(L(({flattenedNodes:n})=>{this._calculateParents(n)})):(this._ariaSets.set(null,[...e]),this._flattenNestedNodesWithExpansion(e).pipe(p(n=>({renderNodes:e,flattenedNodes:n}))))}_updateCachedData(e){this._flattenedNodes.next(e)}_updateKeyManagerItems(e){this._keyManagerNodes.next(e)}_calculateParents(e){let i=this._getLevelAccessor();if(i){this._parents.clear(),this._ariaSets.clear();for(let n=0;n<e.length;n++){let s=e[n],o=this._getExpansionKey(s);this._levels.set(o,i(s));let l=this._findParentForNode(s,n,e);this._parents.set(o,l);let d=l?this._getExpansionKey(l):null,c=this._ariaSets.get(d)??[];c.splice(n,0,s),this._ariaSets.set(d,c)}}}};t.\u0275fac=function(i){return new(i||t)(h(ue),h(G))},t.\u0275cmp=N({type:t,selectors:[["cdk-tree"]],contentQueries:function(i,n,s){if(i&1&&Se(s,ie,5),i&2){let o;V(o=H())&&(n._nodeDefs=o)}},viewQuery:function(i,n){if(i&1&&Y(te,7),i&2){let s;V(s=H())&&(n._nodeOutlet=s.first)}},hostAttrs:["role","tree",1,"cdk-tree"],hostBindings:function(i,n){i&1&&w("keydown",function(o){return n._sendKeydownToKeyManager(o)})},inputs:{dataSource:"dataSource",treeControl:"treeControl",levelAccessor:"levelAccessor",childrenAccessor:"childrenAccessor",trackBy:"trackBy",expansionKey:"expansionKey"},exportAs:["cdkTree"],standalone:!0,features:[S],decls:1,vars:0,consts:[["cdkTreeNodeOutlet",""]],template:function(i,n){i&1&&q(0,0)},dependencies:[te],encapsulation:2});let r=t;return r})(),T=(()=>{let t=class t{get role(){return"treeitem"}set role(e){}get isExpandable(){return this._isExpandable()}set isExpandable(e){this._inputIsExpandable=e,!(this.data&&!this._isExpandable||!this._inputIsExpandable)&&(this._inputIsExpanded?this.expand():this._inputIsExpanded===!1&&this.collapse())}get isExpanded(){return this._tree.isExpanded(this._data)}set isExpanded(e){this._inputIsExpanded=e,e?this.expand():this.collapse()}getLabel(){return this.typeaheadLabel||this._elementRef.nativeElement.textContent?.trim()||""}get data(){return this._data}set data(e){e!==this._data&&(this._data=e,this._dataChanges.next())}get isLeafNode(){return this._tree.treeControl?.isExpandable!==void 0&&!this._tree.treeControl.isExpandable(this._data)?!0:this._tree.treeControl?.isExpandable===void 0&&this._tree.treeControl?.getDescendants(this._data).length===0}get level(){return this._tree._getLevel(this._data)??this._parentNodeAriaLevel}_isExpandable(){return this._tree.treeControl?!this.isLeafNode:this._inputIsExpandable}_getAriaExpanded(){return this._isExpandable()?String(this.isExpanded):null}_getSetSize(){return this._tree._getSetSize(this._data)}_getPositionInSet(){return this._tree._getPositionInSet(this._data)}constructor(e,i){this._elementRef=e,this._tree=i,this._tabindex=-1,this.activation=new ce,this.expandedChange=new ce,this._destroyed=new K,this._dataChanges=new K,this._inputIsExpandable=!1,this._inputIsExpanded=void 0,this._shouldFocus=!0,this._changeDetectorRef=U(G),t.mostRecentTreeNode=this}ngOnInit(){this._parentNodeAriaLevel=Ze(this._elementRef.nativeElement),this._tree._getExpansionModel().changed.pipe(p(()=>this.isExpanded),Te()).subscribe(()=>{this._changeDetectorRef.markForCheck()}),this._tree._setNodeTypeIfUnset("flat"),this._tree._registerNode(this)}ngOnDestroy(){t.mostRecentTreeNode===this&&(t.mostRecentTreeNode=null),this._dataChanges.complete(),this._destroyed.next(),this._destroyed.complete()}getParent(){return this._tree._getNodeParent(this)??null}getChildren(){return this._tree._getNodeChildren(this)}focus(){this._tabindex=0,this._shouldFocus&&this._elementRef.nativeElement.focus(),this._changeDetectorRef.markForCheck()}unfocus(){this._tabindex=-1,this._changeDetectorRef.markForCheck()}activate(){this.isDisabled||this.activation.next(this._data)}collapse(){this.isExpandable&&this._tree.collapse(this._data)}expand(){this.isExpandable&&this._tree.expand(this._data)}makeFocusable(){this._tabindex=0,this._changeDetectorRef.markForCheck()}_focusItem(){this.isDisabled||this._tree._keyManager.focusItem(this)}_setActiveItem(){this.isDisabled||(this._shouldFocus=!1,this._tree._keyManager.focusItem(this),this._shouldFocus=!0)}_emitExpansionState(e){this.expandedChange.emit(e)}};t.mostRecentTreeNode=null,t.\u0275fac=function(i){return new(i||t)(h(j),h(y))},t.\u0275dir=f({type:t,selectors:[["cdk-tree-node"]],hostAttrs:["role","treeitem",1,"cdk-tree-node"],hostVars:5,hostBindings:function(i,n){i&1&&w("click",function(){return n._setActiveItem()})("focus",function(){return n._focusItem()}),i&2&&(X("tabindex",n._tabindex),v("aria-expanded",n._getAriaExpanded())("aria-level",n.level+1)("aria-posinset",n._getPositionInSet())("aria-setsize",n._getSetSize()))},inputs:{role:"role",isExpandable:[2,"isExpandable","isExpandable",B],isExpanded:"isExpanded",isDisabled:[2,"isDisabled","isDisabled",B],typeaheadLabel:[0,"cdkTreeNodeTypeaheadLabel","typeaheadLabel"]},outputs:{activation:"activation",expandedChange:"expandedChange"},exportAs:["cdkTreeNode"],standalone:!0,features:[E]});let r=t;return r})();function Ze(r){let t=r.parentElement;for(;t&&!Je(t);)t=t.parentElement;return t?t.classList.contains("cdk-nested-tree-node")?I(t.getAttribute("aria-level")):0:-1}function Je(r){let t=r.classList;return!!(t?.contains("cdk-nested-tree-node")||t?.contains("cdk-tree"))}var et=/([A-Za-z%]+)$/,ve=(()=>{let t=class t{get level(){return this._level}set level(e){this._setLevelInput(e)}get indent(){return this._indent}set indent(e){this._setIndentInput(e)}constructor(e,i,n,s){this._treeNode=e,this._tree=i,this._element=n,this._dir=s,this._destroyed=new K,this.indentUnits="px",this._indent=40,this._setPadding(),s&&s.change.pipe(R(this._destroyed)).subscribe(()=>this._setPadding(!0)),e._dataChanges.subscribe(()=>this._setPadding())}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}_paddingIndent(){let e=(this._treeNode.data&&this._tree._getLevel(this._treeNode.data))??null,i=this._level==null?e:this._level;return typeof i=="number"?`${i*this._indent}${this.indentUnits}`:null}_setPadding(e=!1){let i=this._paddingIndent();if(i!==this._currentPadding||e){let n=this._element.nativeElement,s=this._dir&&this._dir.value==="rtl"?"paddingRight":"paddingLeft",o=s==="paddingLeft"?"paddingRight":"paddingLeft";n.style[s]=i||"",n.style[o]="",this._currentPadding=i}}_setLevelInput(e){this._level=isNaN(e)?null:e,this._setPadding()}_setIndentInput(e){let i=e,n="px";if(typeof e=="string"){let s=e.split(et);i=s[0],n=s[1]||n}this.indentUnits=n,this._indent=I(i),this._setPadding()}};t.\u0275fac=function(i){return new(i||t)(h(T),h(y),h(j),h(J,8))},t.\u0275dir=f({type:t,selectors:[["","cdkTreeNodePadding",""]],inputs:{level:[2,"cdkTreeNodePadding","level",I],indent:[0,"cdkTreeNodePaddingIndent","indent"]},standalone:!0,features:[E]});let r=t;return r})(),xe=(()=>{let t=class t{constructor(e,i){this._tree=e,this._treeNode=i,this.recursive=!1}_toggle(){this.recursive?this._tree.toggleDescendants(this._treeNode.data):this._tree.toggle(this._treeNode.data),this._tree._keyManager.focusItem(this._treeNode)}};t.\u0275fac=function(i){return new(i||t)(h(y),h(T))},t.\u0275dir=f({type:t,selectors:[["","cdkTreeNodeToggle",""]],hostAttrs:["tabindex","-1"],hostBindings:function(i,n){i&1&&w("click",function(o){return n._toggle(),o.stopPropagation()})("keydown.Enter",function(o){return n._toggle(),o.preventDefault()})("keydown.Space",function(o){return n._toggle(),o.preventDefault()})},inputs:{recursive:[2,"cdkTreeNodeToggleRecursive","recursive",B]},standalone:!0,features:[E]});let r=t;return r})();var ze=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=W({type:t}),t.\u0275inj=Q({});let r=t;return r})();function it(r){return!!r._isNoopTreeKeyManager}var Ue=(()=>{let t=class t extends T{get tabIndexInputBinding(){return this._tabIndexInputBinding}set tabIndexInputBinding(e){this._tabIndexInputBinding=e}_getTabindexAttribute(){return it(this._tree._keyManager)?this.tabIndexInputBinding:this._tabindex}get disabled(){return this.isDisabled}set disabled(e){this.isDisabled=e}constructor(e,i,n){super(e,i),this.defaultTabIndex=0,this.tabIndexInputBinding=Number(n)||this.defaultTabIndex}ngOnInit(){super.ngOnInit()}ngOnDestroy(){super.ngOnDestroy()}};t.\u0275fac=function(i){return new(i||t)(h(j),h(y),Ne("tabindex"))},t.\u0275dir=f({type:t,selectors:[["mat-tree-node"]],hostAttrs:[1,"mat-tree-node"],hostVars:5,hostBindings:function(i,n){i&1&&w("click",function(){return n._focusItem()}),i&2&&(X("tabindex",n._getTabindexAttribute()),v("aria-expanded",n._getAriaExpanded())("aria-level",n.level+1)("aria-posinset",n._getPositionInSet())("aria-setsize",n._getSetSize()))},inputs:{tabIndexInputBinding:[2,"tabIndex","tabIndexInputBinding",e=>e==null?0:I(e)],disabled:[2,"disabled","disabled",B]},outputs:{activation:"activation",expandedChange:"expandedChange"},exportAs:["matTreeNode"],standalone:!0,features:[x([{provide:T,useExisting:t}]),E,b]});let r=t;return r})(),We=(()=>{let t=class t extends ie{};t.\u0275fac=(()=>{let e;return function(n){return(e||(e=O(t)))(n||t)}})(),t.\u0275dir=f({type:t,selectors:[["","matTreeNodeDef",""]],inputs:{when:[0,"matTreeNodeDefWhen","when"],data:[0,"matTreeNode","data"]},standalone:!0,features:[x([{provide:ie,useExisting:t}]),b]});let r=t;return r})();var $e=(()=>{let t=class t extends ve{get level(){return this._level}set level(e){this._setLevelInput(e)}get indent(){return this._indent}set indent(e){this._setIndentInput(e)}};t.\u0275fac=(()=>{let e;return function(n){return(e||(e=O(t)))(n||t)}})(),t.\u0275dir=f({type:t,selectors:[["","matTreeNodePadding",""]],inputs:{level:[2,"matTreeNodePadding","level",I],indent:[0,"matTreeNodePaddingIndent","indent"]},standalone:!0,features:[x([{provide:ve,useExisting:t}]),E,b]});let r=t;return r})(),Qe=(()=>{let t=class t{constructor(e,i){this.viewContainer=e,this._node=i}};t.\u0275fac=function(i){return new(i||t)(h($),h(me,8))},t.\u0275dir=f({type:t,selectors:[["","matTreeNodeOutlet",""]],standalone:!0,features:[x([{provide:te,useExisting:t}])]});let r=t;return r})(),qe=(()=>{let t=class t extends y{constructor(){super(...arguments),this._nodeOutlet=void 0}};t.\u0275fac=(()=>{let e;return function(n){return(e||(e=O(t)))(n||t)}})(),t.\u0275cmp=N({type:t,selectors:[["mat-tree"]],viewQuery:function(i,n){if(i&1&&Y(Qe,7),i&2){let s;V(s=H())&&(n._nodeOutlet=s.first)}},hostAttrs:[1,"mat-tree"],exportAs:["matTree"],standalone:!0,features:[x([{provide:y,useExisting:t}]),b,S],decls:1,vars:0,consts:[["matTreeNodeOutlet",""]],template:function(i,n){i&1&&q(0,0)},dependencies:[Qe],styles:[".mat-tree{display:block;background-color:var(--mat-tree-container-background-color, var(--mat-app-surface))}.mat-tree-node,.mat-nested-tree-node{color:var(--mat-tree-node-text-color, var(--mat-app-on-surface));font-family:var(--mat-tree-node-text-font, var(--mat-app-body-large-font));font-size:var(--mat-tree-node-text-size, var(--mat-app-body-large-size));font-weight:var(--mat-tree-node-text-weight, var(--mat-app-body-large-weight))}.mat-tree-node{display:flex;align-items:center;flex:1;word-wrap:break-word;min-height:var(--mat-tree-node-min-height)}.mat-nested-tree-node{border-bottom-width:0}"],encapsulation:2});let r=t;return r})(),Xe=(()=>{let t=class t extends xe{};t.\u0275fac=(()=>{let e;return function(n){return(e||(e=O(t)))(n||t)}})(),t.\u0275dir=f({type:t,selectors:[["","matTreeNodeToggle",""]],inputs:{recursive:[0,"matTreeNodeToggleRecursive","recursive"]},standalone:!0,features:[x([{provide:xe,useExisting:t}]),b]});let r=t;return r})();var Ye=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=W({type:t}),t.\u0275inj=Q({imports:[ze,pe,pe]});let r=t;return r})(),ne=class{constructor(t,a,e,i){this.transformFunction=t,this.getLevel=a,this.isExpandable=e,this.getChildren=i}_flattenNode(t,a,e,i){let n=this.transformFunction(t,a);if(e.push(n),this.isExpandable(n)){let s=this.getChildren(t);s&&(Array.isArray(s)?this._flattenChildren(s,a,e,i):s.pipe(D(1)).subscribe(o=>{this._flattenChildren(o,a,e,i)}))}return e}_flattenChildren(t,a,e,i){t.forEach((n,s)=>{let o=i.slice();o.push(s!=t.length-1),this._flattenNode(n,a+1,e,o)})}flattenNodes(t){let a=[];return t.forEach(e=>this._flattenNode(e,0,a,[])),a}expandFlattenedNodes(t,a){let e=[],i=[];return i[0]=!0,t.forEach(n=>{let s=!0;for(let o=0;o<=this.getLevel(n);o++)s=s&&i[o];s&&e.push(n),this.isExpandable(n)&&(i[this.getLevel(n)+1]=a.isExpanded(n))}),e}},se=class extends Re{get data(){return this._data.value}set data(t){this._data.next(t),this._flattenedData.next(this._treeFlattener.flattenNodes(this.data)),this._treeControl.dataNodes=this._flattenedData.value}constructor(t,a,e){super(),this._treeControl=t,this._treeFlattener=a,this._flattenedData=new g([]),this._expandedData=new g([]),this._data=new g([]),e&&(this.data=e)}connect(t){return Ie(t.viewChange,this._treeControl.expansionModel.changed,this._flattenedData).pipe(p(()=>(this._expandedData.next(this._treeFlattener.expandFlattenedNodes(this._flattenedData.value,this._treeControl)),this._expandedData.value)))}disconnect(){}};var Ge=[{name:"components",type:"folder",children:[{name:"src",type:"folder",children:[{name:"cdk",type:"folder",children:[{name:"package.json",type:"file"},{name:"BUILD.bazel",type:"file"}]},{name:"material",type:"folder"}]}]},{name:"angular",type:"folder",children:[{name:"packages",type:"folder",children:[{name:".travis.yml",type:"file"},{name:"firebase.json",type:"file"}]},{name:"package.json",type:"file"}]},{name:"angularjs",type:"folder",children:[{name:"gulpfile.js",type:"file"},{name:"README.md",type:"file"}]}];function st(r,t){if(r&1&&(k(0,"mat-tree-node",3),Ae(1,"button",4),k(2,"mat-icon",5),A(3),C(),A(4),C()),r&2){let a=t.$implicit;_(2),v("aria-label",a.type+"icon"),_(),F(" ",a.type==="file"?"description":"folder"," "),_(),F(" ",a.name," ")}}function rt(r,t){if(r&1&&(k(0,"mat-tree-node",6)(1,"button",7)(2,"mat-icon",8),A(3),C()(),k(4,"mat-icon",5),A(5),C(),A(6),C()),r&2){let a=t.$implicit,e=Fe();_(),v("aria-label","Toggle "+a.name),_(2),F(" ",e.treeControl.isExpanded(a)?"expand_more":"chevron_right"," "),_(),v("aria-label",a.type+"icon"),_(),F(" ",a.type==="file"?"description":"folder"," "),_(),F(" ",a.name," ")}}var re=class r{treeControl;treeFlattener;dataSource;constructor(){this.treeFlattener=new ne(this.transformer,this.getLevel,this.isExpandable,this.getChildren),this.treeControl=new ee(this.getLevel,this.isExpandable),this.dataSource=new se(this.treeControl,this.treeFlattener),this.dataSource.data=Ge}transformer(t,a){return{name:t.name,type:t.type,level:a,expandable:!!t.children}}getLevel(t){return t.level}isExpandable(t){return t.expandable}hasChild(t,a){return a.expandable}getChildren(t){return t.children}static \u0275fac=function(a){return new(a||r)};static \u0275cmp=N({type:r,selectors:[["app-tree"]],standalone:!0,features:[S],decls:3,vars:3,consts:[[3,"dataSource","treeControl"],["matTreeNodeToggle","","matTreeNodePadding","",4,"matTreeNodeDef"],["matTreeNodePadding","",4,"matTreeNodeDef","matTreeNodeDefWhen"],["matTreeNodeToggle","","matTreeNodePadding",""],["mat-icon-button","","disabled",""],[1,"type-icon"],["matTreeNodePadding",""],["mat-icon-button","","matTreeNodeToggle",""],[1,"mat-icon-rtl-mirror"]],template:function(a,e){a&1&&(k(0,"mat-tree",0),we(1,st,5,3,"mat-tree-node",1)(2,rt,7,5,"mat-tree-node",2),C()),a&2&&(he("dataSource",e.dataSource)("treeControl",e.treeControl),_(2),he("matTreeNodeDefWhen",e.hasChild))},dependencies:[Ye,We,$e,Xe,qe,Ue,Pe,Ke,je,Oe],styles:[".type-icon[_ngcontent-%COMP%]{color:#757575;margin-right:5px}"]})};var ti=[{path:"",component:re}];export{ti as default};
