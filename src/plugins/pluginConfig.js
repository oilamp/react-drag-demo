import { createUUID, deepClone } from '../utils/util';
import { cloneDeep, merge } from "lodash";
// 元素配置信息字段
let elementConfig = {
	name: '', // 组件名
	animations: [], // 动画
	commonStyle: {
		position: 'absolute',
		width: 960,
		height: 30,
		top: 200,
		left: 0,
		rotate: 0,
		paddingTop: 0,
		paddingLeft: 0,
		paddingRight: 0,
		paddingBottom: 0,
		marginTop: 0,
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 0,
		borderWidth: 0,
		borderColor: '',
		borderStyle: 'solid',
		borderRadius: 0,
		boxShadow: '',
		fontSize: 16,
		fontWeight: 500,
		lineHeight: 1.4,
		letterSpacing: 0,
		textAlign: 'center',
		color: '#000000',
		backgroundColor: '',
		backgroundImage: '',
		backgroundSize: 'cover',
		opacity: 1,
		zIndex: 1
	}, // 公共样式
	defaultPorps: {},
	propsValue: {}, // 属性参数
	value: '', // 绑定值
	valueType: 'String' // 值类型
}

export function getElementConfig (element, extendStyle = {}) {
	let elementData = cloneDeep(element)
	let type = elementData.valueType || 'String' // 默认string类型
	let dict = {
		'Sting': '',
		'Array': [],
		'Object': {},
		'Boolean': false,
		'Number': 0
		// 待扩展数据类型
	}
	let elementConfigData = cloneDeep(elementConfig)
	let config = {
		uuid: createUUID(),
		...elementConfigData,
		name: elementData.name,
		propsValue: deepClone(elementData.needProps || {})
	}
	// 样式
	config.commonStyle = merge(config.commonStyle, elementData.defaultStyle)
	config.commonStyle = merge(config.commonStyle, extendStyle)

	config.value = element.defaultValue || dict[type];
	config.valueType = type;
	config.isForm = !!element.isForm;
	return config;
}

export function getCommonStyle (styleObj, scalingRatio = 1) {
	let needUnitStr = ['width', 'height','top', 'left', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom', 'borderWidth','fontSize', 'borderRadius', 'letterSpacing']
	let style ={}

	for (let key in styleObj){
		if(needUnitStr.includes(key)){
			style[key] = (styleObj[key] * scalingRatio) + 'px'
		}else{
			style[key] = styleObj[key]
		}
	}
	style.transform = `rotate(${style.rotate}deg)`
	style.backgroundImage = style.backgroundImage ? `url(${style.backgroundImage})` : '';
	return style;
}