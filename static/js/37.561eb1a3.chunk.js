"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[37],{6037:function(e,n,t){t.r(n),t.d(n,{default:function(){return w}});var a="Contacts_contactsContainer__xQQHw",r="Contacts_contactsItem__FK3AO",s="Contacts_contactsPreloader__OG6Wn",c="Contacts_preloader__nWWqY",o=t(9434),i=function(e){return e.storeContacts.stateContacts},l=function(e){return e.storeContacts.isLoading},u=function(e){return e.storeContacts.error},d=function(e){return e.storeFilter.stateFilter},m=t(1641),h="Filter_inputWrapper__-FNL8",f=t(184),p=function(){var e=(0,o.I0)(),n=(0,o.v9)(d);return(0,f.jsxs)("div",{className:h,children:[(0,f.jsx)("label",{htmlFor:"searchInput",children:"Search contacts by name here"}),(0,f.jsx)("input",{className:"form-control me-2",type:"search",placeholder:"Search","aria-label":"Search",id:"searchInput",name:"filter",onChange:function(n){var t=n.target.value;e((0,m.a)({value:t}))},value:n})]})},v=t(9439),x=t(1686),b=t.n(x),j=t(2791),N=t(8700),_=function(){var e=(0,o.I0)(),n=(0,o.v9)(i),t=(0,j.useState)(""),a=(0,v.Z)(t,2),r=a[0],s=a[1],c=(0,j.useState)(""),l=(0,v.Z)(c,2),u=l[0],d=l[1],m=function(e){var n=e.target,t=n.name,a=n.value;"name"===t?s(a):d(a)};return(0,f.jsxs)("form",{onSubmit:function(t){(t.preventDefault(),n.find((function(e){return e.name===r})))?b().Notify.warning('User "'.concat(r,'" is already in contacts')):e((0,N.uK)({name:r,number:u}))&&(b().Notify.success('Contact "'.concat(r,'" added successfully!')),s(""),d(""))},children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("label",{htmlFor:"UserName",children:"Name"}),(0,f.jsx)("input",{className:"form-control me-2",placeholder:"Enter contact name here","aria-label":"User Name",id:"UserId",type:"text",name:"name",pattern:"^[a-zA-Z\u0430-\u044f\u0410-\u042f]+(([' -][a-zA-Z\u0430-\u044f\u0410-\u042f ])?[a-zA-Z\u0430-\u044f\u0410-\u042f]*)*$",title:"Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",required:!0,onChange:m,value:r})]}),(0,f.jsxs)("div",{children:[(0,f.jsx)("label",{htmlFor:"UserNumber",children:"Phone Number"}),(0,f.jsx)("input",{className:"form-control me-2",placeholder:"Enter contact phone number here","aria-label":"Phone number",id:"number",onChange:m,value:u,type:"tel",name:"number",pattern:"\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}",title:"Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",required:!0})]}),(0,f.jsx)("button",{className:"btn btn-outline-primary",type:"submit",children:"Add contact"})]})},C="Contacts_list__R3QeP",y="Contacts_listItem__ipWRN";function g(e){var n=e.name,t=e.number,a=e.id,r=(0,o.I0)();return(0,f.jsxs)("li",{className:y,children:[n,": ",t,(0,f.jsx)("button",{className:"btn btn-outline-primary",onClick:function(){r((0,N.GK)(a)).unwrap().then((function(e){b().Notify.success('Contact "'.concat(e.name,'" has been deleted'))})).catch((function(e){b().Notify.failure('Some error: "'.concat(e,'"'))}))},children:"Delete"})]})}var F=function(){var e=(0,o.v9)(i),n=(0,o.v9)(d),t=n?e.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})):e;return t.length>0&&(0,f.jsx)("ul",{className:C,children:t.map((function(e){var n=e.name,t=e.number,a=e.id;return(0,f.jsx)(g,{name:n,number:t,id:a},a)}))})},w=function(){var e=(0,o.v9)(l),n=(0,o.v9)(u),t=(0,o.v9)(i),d=(0,o.I0)();return(0,j.useEffect)((function(){d((0,N.yF)())}),[d]),(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)("div",{className:a,children:[(0,f.jsxs)("div",{className:r,children:[(0,f.jsx)("h2",{children:"Phonebook"}),(0,f.jsx)(_,{})]}),t.length>0&&(0,f.jsxs)("div",{children:[(0,f.jsxs)("div",{className:r,children:[(0,f.jsx)("h2",{children:"Contacts"}),(0,f.jsx)(p,{})]}),(0,f.jsxs)("div",{className:r,children:[(0,f.jsxs)("div",{className:s,children:[(0,f.jsx)("p",{children:"List of contacts"}),(0,f.jsx)("div",{className:c,children:e&&!n&&(0,f.jsx)(f.Fragment,{})})]}),(0,f.jsx)(F,{}),n&&(0,f.jsxs)("h2",{children:["Error: ",n]})]})]})]})})}}}]);
//# sourceMappingURL=37.561eb1a3.chunk.js.map