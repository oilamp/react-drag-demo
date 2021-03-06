export default function AppReducer (state, action) {
    switch (action.type) {
        case 'els_add':
            return {...state, els: [...state.els, action.el]};
        case 'els_remove':
            return {...state, els: state.els.filter(item => item.uuid !== action.uuid)};
        case 'els_change':
            const els = state.els.filter(item => item.uuid !== action.el.uuid);
            els.push(action.el);
            return {...state, els};
        case 'els_clean':
            return {...state, els: []};
        case 'uuid_change': 
            return {...state, activeUUID: action.uuid};
        case 'drag_el_change': 
            return {...state, dragEl: action.el};    
        default:
            throw new Error();
    }
}