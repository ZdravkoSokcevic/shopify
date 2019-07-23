let listeners={
    addListener:(item,data)=>{
        item.addEventListener('click',(e)=>{
            console.log(data);
            toggle.show(detailModal.container);
            console.log(detailModal.title);
            console.log(detailModal.category);
            detailModal.intialStyle();
            detailModal.fillModal('menu',data);
        });
    },
    closeModalBtnListener:(item)=>{
        item.addEventListener('click',(e)=>{
            detailModal.container.style.display='none';
        })
    }
}