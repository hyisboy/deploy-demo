/*
 * @Author: daiwei
 * @since: 2020-04-07 17:57:27
 * @lastTime: 2020-05-22 09:58:30
 * @LastAuthor: Do not edit
 * @FilePath: /ichargingpole_web/src/utils/map.ts
 * @message: map
 */
import "@amap/amap-jsapi-types";
import AMapLoader from '@amap/amap-jsapi-loader';
const AMAP_WEB_SERVICE_KEY = '78b36400875540629736457fb7dd3866'; //高德地图  Web服务 key 用于静态地图
const AMAP_WEB_KEY = '0a320d6aa0891162c89dc194b5794e94'; //高德地图  Web端 key
/**
 * 将经纬度转化为数据
 * @param lnglat
 */
export function getLnglatArr(lnglat) {
    return [lnglat.getLng(), lnglat.getLat()];
}
/**
 * 异步加载
 * 完成加载后执行回调： window.onload
 * @param version
 * 向head中添加script标签
 * script标签 的 id = mapScript
 */
export function asyncLoadMap(version, plugins) {
    /* var url_v1_4_15 = `https://webapi.amap.com/maps?v=1.4.15&key=0a320d6aa0891162c89dc194b5794e94&plugin=AMap.MarkerClusterer,AMap.Geocoder&callback=loadMap`;
    var url_v2_0 = `https://webapi.amap.com/maps?v=2.0&key=0a320d6aa0891162c89dc194b5794e94&callback=loadMap`;
    var jsapi = document.createElement('script');
    jsapi.id = 'mapScript';
    jsapi.charset = 'utf-8';
    jsapi.src = version == '1.4.15' ? url_v1_4_15 : url_v2_0;
    document.head.appendChild(jsapi);
    return new Promise((resolve) => {
      window['loadMap'] = function () {
        resolve();
      }
    }) */
    //插件
    plugins = plugins || ['AMap.MarkerClusterer', 'AMap.Geocoder'];
    return new Promise((resolve, reject) => {
        // 判断是否已经加载了地图
        if (window.AMap) {
            resolve(window.AMap);
            return;
        }
        AMapLoader.load({
            "key": AMAP_WEB_KEY,
            "version": version,
            "plugins": plugins //插件列表
        }).then((AMap) => {
            console.log('地图加载完成');
            window.AMap = AMap;
            resolve(AMap);
        }).catch(e => {
            reject(e);
            console.log('e:', e);
        });
    });
}
/**
 * 移除head中加载高德地图的script标签
 */
export function removeMapScript() {
    let scriptDom = document.getElementById('mapScript');
    if (scriptDom) {
        document.head.removeChild(scriptDom);
        console.log('移除加载高德地图的script标签');
    }
}
/**
 * 获取当前地区的行政编码
 * @param name 查询的行政区域名称
 * @param level 查询的行政区域的等级
 */
export function getAdcode(name, parentAdcode, level) {
    return new Promise((resolve, reject) => {
        const levels = ['country', 'province', 'city', 'district'];
        if (levels.indexOf(level) < 0) {
            level = 'district';
        }
        new AMap.DistrictSearch({
            level: level,
            subdistrict: 0
        }).search(name, function (status, result) {
            if (status === "complete" && result && result.info === 'OK' && result.districtList && result.districtList.length > 0) {
                console.log('adcode:', result.districtList);
                let adcode = '';
                const start_slice = level === 'province' ? 1 : (level === 'city' ? 2 : (level === 'district' ? 3 : 3));
                result.districtList.forEach(_item => {
                    if (_item.adcode.indexOf(parentAdcode.slice(0, start_slice)) > -1) {
                        adcode = _item.adcode;
                    }
                });
                resolve(adcode);
            }
            else {
                reject(status);
            }
        });
    });
}
/**
 * 获取当前的位置信息
 * @param map
 */
export function getCurrentCenter(map) {
    return new Promise((success, fail) => {
        const _complate = (geolocationResult) => {
            success(geolocationResult);
        };
        const _error = (geolocationError) => {
            fail(geolocationError);
        };
        map.plugin('AMap.Geolocation', function () {
            let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
                convert: true,
                showButton: true,
                buttonPosition: 'LB',
                buttonOffset: new AMap.Pixel(10, 20),
                showMarker: false,
                showCircle: false,
                panToLocation: true,
                zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', _complate); //返回定位信息
            AMap.event.addListener(geolocation, 'error', _error); //返回定位出错信息
        });
    });
}
/**
 * 创建一个地图实例
 * @param eleId 当前地图的容器ID
 */
export function createAMap(eleId, options) {
    if (AMap && typeof AMap === 'object') {
        let option = {
            mapStyle: 'amap://styles/b8d9d9862b2e5050d8d7e71f200be29e?isPublic=true',
            //pitch: 50,
            zoom: 14,
            zooms: [3, 20],
        };
        // 如果预设不为空
        if (options) {
            for (const [_key, _value] of Object.entries(options)) {
                option[_key] = _value;
            }
        }
        let map = new AMap.Map(eleId, option);
        /*  map.on('click', function (e) {
           setTemplat(e.lnglat);
         }) */
        return map;
    }
    else {
        throw new Error('not find AMap !!');
    }
}
/* function setTempMarkers () {
  let locations = localStorage.getItem('locations');
  let arr = [];
  if(locations){
    arr = JSON.parse(locations);
  }
  let types = ['success', 'danger','fault','alarm'];
  let typeIndex = 0;
  let _obj = [];
  arr.forEach((_lnglat,_index) => {
    typeIndex = _index % 4;
    let location = {lnglat: _lnglat, type: types[typeIndex]};
    _obj.push(location);
  })
  localStorage.setItem('markers',JSON.stringify(_obj));
} */
/**
 * 解析地址， 根据 location -》 {lng, lat}
 * @param {*} map
 * @param {*} geoCoder
 * @param {*} marker
 * @param {*} location
 */
export function regeoCode(map, geoCoder, marker, location) {
    return new Promise((success, fail) => {
        geoCoder.getAddress([location.lng, location.lat], function (status, result) {
            if (result.info == 'OK') {
                success(result);
            }
            else {
                fail();
            }
        });
    });
}
//创建marker 内容 
function markerContentFactory(marker, callback) {
    let _markerType = getMarkerType(marker);
    let _img = '';
    switch (_markerType) {
        /* case 'fault':
          _img = require('../assets/img/site_fault.png');
          break;
        case 'alarm':
          _img = require('../assets/img/site_alarm.png');
          break;
        case 'danger':
          _img = require('../assets/img/site_danger.png');
          break; */
    }
    /*   let _fireContent = `
      <div class="shadowbox">
      <div class="sdchild"></div>
      <div class="sdchild2"></div>
      <div class="sdchild3"></div>
    </div>
      ` */
    let content = `
  <div class="marker-wrap ${_markerType}">
  <div class="marker-content">
    <div class="marker-icon">
      <img  src="${_img}" >
    </div>
  </div>
</div>
  `;
    // 初始化
    let div = document.createElement('div');
    div.innerHTML = content;
    // 点击事件的回调
    div.addEventListener('click', function () {
        callback(marker);
    });
    return div;
}
/**
 * 添加标记
 * @param mapInstance
 * @param smokeAlarm
 */
function createMarker(markers, callback) {
    let marker = new AMap.Marker({
        content: markerContentFactory(markers, callback),
        position: [markers.lnglat.lng, markers.lnglat.lat],
        offset: new AMap.Pixel(0, 0),
        anchor: 'bottom-center',
        zIndex: 9999
    });
    marker.setExtData({ type: markers.type });
    marker.on('click', function () {
    });
    return marker;
}
/**
 * 点击 marker弹窗信息
 */
export function openInfoWindow(map, marker) {
    let options = {
        closeWhenClickMap: false,
    };
    let _mapWindow = new AMap.InfoWindow(options);
    _mapWindow.setContent(_createInfoWindowContent());
    _mapWindow.open(map, [marker.lnglat.lng, marker.lnglat.lat]);
}
/**
 * 创建 点击marker弹窗显示的内容
 * @return content
 */
export function _createInfoWindowContent() {
    let content = `
    <div>我是弹窗</div>
   `;
    return content;
}
/**
 * 重新为点聚合对象设置marker
 * @param markers
 */
export function setClusterMarker(markerCluster, markers) {
    markerCluster.setMarkers(markers);
}
export function createBatchMarker(markers, markerClickCallback) {
    let _aMapMakers = [];
    markers.forEach((item) => {
        _aMapMakers.push(createMarker(item, markerClickCallback));
    });
    return _aMapMakers;
}
/**
 * 创建聚合点对象，并为聚合点添加marker
 * @param map 地图实例
 * @param markers  marker数据
 * @param markerClickCallback  点击marker的事件
 * @param MarkerCluster 聚合点对象
 */
export function createMarkerCluster(map, markers, markerClickCallback) {
    let _aMapMakers = createBatchMarker(markers, markerClickCallback);
    let options = {
        maxZoom: 14,
        clusterByZoomChange: true,
        renderClusterMarker: _renderClusterMarker,
        gridSize: 200,
        averageCenter: true,
    };
    let _markerCluster = new AMap.MarkerClusterer(map, _aMapMakers, options);
    /* // 添加聚合标记
    let _clusterer: MarkerClusterer = addCluster(2, map, markers);
    let position = getPosition(markerUnits[markerUnits.length - 1].placePoint);
    console.log({ position })
    if (position) {
      setCenter(map, position);
    }
    return _clusterer; */
    return _markerCluster;
}
/**
 * 设置中心位置
 * @param {*} map
 * @param {*} position
 */
function setCenter(map, position) {
    try {
        map.setCenter([position.lng, position.lat]);
    }
    catch (e) {
        console.log({ position });
    }
}
/**
 * 向地图中添加点聚合
 * @param tag 先不用管
 * @param map 地图对象
 * @param markers marker数组
 */
/* function addCluster(tag, map, markers: Array<any>): MarkerClusterer {
  let cluster;
  if (cluster) {
    cluster.setMap(null);
  }
  cluster = new AMap.MarkerClusterer(map, markers, {
    gridSize: 200, maxZoom: 19,minClusterSize: 2,
    renderClusterMarker: _renderClusterMarker,averageCenter: true
  });
  cluster.on('click', function (e, markers) {
    if (map.getZoom() == 18) {
      var itemsContent = "";
      e.markers.forEach(function (item, index) {
        itemsContent += item.content;
        // console.log(itemsContent);
      });
      e.markers.forEach(function (item, index) {
        console.log('max:', item);
      });
    }
  })
  return cluster;
} */
/**
 * 聚合marker
 * @param context
 */
function _renderClusterMarker(context) {
    const { markers, count, marker } = context;
    var _markerType = getMarkerType(markers);
    var div = document.createElement('div');
    let _img = '';
    switch (_markerType) {
        /* case 'fault':
          _img = require('../assets/img/site_fault.png');
          break;
        case 'alarm':
          _img = require('../assets/img/site_alarm.png');
          break;
        case 'danger':
          _img = require('../assets/img/site_danger.png');
          break; */
    }
    /*  let _fireContent = `
       <div class="shadowbox">
        <div class="sdchild"></div>
        <div class="sdchild2"></div>
        <div class="sdchild3"></div>
       </div>
     `; */
    let _innerhtml = `
  <div class="marker-wrap ${_markerType}">
  <div class="marker-content">
    <div class="marker-icon">
      <img  src="${_img}" >
    </div>
    <div class="marker-mask">
    </div>
    <span class="marker-number">${count}</span>
  </div>
</div>
 `;
    div.innerHTML = _innerhtml;
    marker.setContent(div);
    marker.setAnchor('bottom-center');
}
;
/**
 * 从聚合数据中 获取 marker 的类型
 */
function getMarkerType(markers) {
    let weight = {
        success: 1, fault: 2, alarm: 3, danger: 4
    };
    let selfWeight = weight.success;
    let _type = 'success';
    if (Array.isArray(markers)) {
        markers.forEach(_item => {
            switch (_item.getExtData().type) {
                case 'fault':
                    if (selfWeight < weight.fault) {
                        selfWeight = weight.fault;
                        _type = 'fault';
                    }
                    break;
                case 'alarm':
                    if (selfWeight < weight.alarm) {
                        selfWeight = weight.alarm;
                        _type = 'alarm';
                    }
                    break;
                case 'danger':
                    selfWeight = weight.danger;
                    _type = 'danger';
                    break;
            }
        });
    }
    else {
        switch (markers.type) {
            case 'fault':
                if (selfWeight < weight.fault) {
                    selfWeight = weight.fault;
                    _type = 'fault';
                }
                break;
            case 'alarm':
                if (selfWeight < weight.alarm) {
                    selfWeight = weight.alarm;
                    _type = 'alarm';
                }
                break;
            case 'danger':
                selfWeight = weight.danger;
                _type = 'danger';
                break;
        }
    }
    return _type;
}
/**
 * 重新设置聚合实例中marker
 * @param markerClusterer 聚合实例对象
 * @param markerUnits marker数据
 * @param callback 点击事件的回调函数
 */
/* export function setMarkers (markerClusterer: MarkerClusterer, markerUnits: Array<MarkerUnit>,callback: Function) {
  markers = [];
  markerUnits.forEach(item => {
    markers.push(createMarker(item, callback))
  })
  markerClusterer.setMarkers(markers);
} */
/**
 * 获取静态地图
 * @param position 经纬度信息
 * @param label marker标签
 * @return _url 返回对应定位的静态图片url
 */
/* export function getStaticImgForPoint(position: Position | string,label:string,size: {width: number,heihgt:number}):string{
   if(typeof position === 'string'){
     position = getPosition(position) as Position;
   }
   let _url = `
   https://restapi.amap.com/v3/staticmap?location=${position.lng},${position.lat}&zoom=10&size=${size.width}*${size.heihgt}&markers=mid,,A:${position.lng},${position.lat}&key=${AMAP_WEB_SERVICE_KEY}`
   return _url;
} */
/**
 * 初始化 逆解析对象 -》 lanlat 转 地址
 */
export function initGeocoder() {
    let geocoder = new AMap.Geocoder({});
    return geocoder;
}
/**
 * 根据关键字搜索
 * @param {*} keywords
 */
export function searchPlace(keywords) {
    return new Promise((success) => {
        AMap.plugin('AMap.PlaceSearch', function () {
            var autoOptions = {
                city: '全国',
                extensions: 'all'
            };
            var placeSearch = new AMap.PlaceSearch(autoOptions);
            placeSearch.search(keywords, function (status, result) {
                success(result);
            });
        });
    });
}
/**
 * 添加标记
 * @param {*} position
 * @param {*} mapInstance
 */
export function addMarker(mapInstance, position, label) {
    const icon = new AMap.Icon({
        size: new AMap.Size(50, 50),
        image: require('../assets/img/address.png'),
    });
    let marker = new AMap.Marker({
        icon: icon,
        position: [position.lng, position.lat],
        anchor: 'top-center',
    });
    if (label) {
        marker.setLabel(label);
    }
    marker.setMap(mapInstance);
    setCenter(mapInstance, position);
    return marker;
}
/**
 * 更新标记的位置
 * @param {*} marker
 * @param {*} position
 */
export function updateMarkerPosition(marker, position, map, label) {
    marker.setPosition([position.lng, position.lat]);
    if (label) {
        marker.setLabel(label);
    }
    setCenter(map, position);
}
//# sourceMappingURL=map.js.map