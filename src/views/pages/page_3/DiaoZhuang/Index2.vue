<template>

	<div class="mangban">
		<van-nav-bar title="吊装作业安全许可证" left-text="返回" right-text="操作" left-arrow @click-left="pageBack" @click-right="openAction" />
		<div class="cell_group">
			<!-- 申请部门 -->
			<cell-value title="申请部门" :value="$userInfo.officeName" disable></cell-value>
			<!-- 申请人 -->
			<cell-value title="申请人" :value="$userInfo.userName" disable></cell-value>
			<!-- 作业票编号 -->
			<cell-value title="作业票编号" value disable></cell-value>
			<!-- 作业票状态 -->
			<cell-value title="作业票状态" value="编辑" disable></cell-value>
			<!-- 吊装内容 -->
			<cell-textarea v-model="sendData.dznr" title="吊装内容" required placeholder="请输入吊装内容"></cell-textarea>
			<!-- 吊装地点 -->
			<cell-input v-model="sendData.dzdd" title="吊装地点" required placeholder="手工录入"></cell-input>
			<!-- 吊装工具名称 -->
			<cell-picker v-model="sendData.dzgjmc" title="吊装工具名称" required :columns="dzgjmcColumns"></cell-picker>
			<!-- 起吊重物重量（t） -->
			<cell-input v-model="sendData.qdzwzl" title="起吊重物重量（t）" required placeholder="手工录入"></cell-input>
			<!-- 吊装人员及特殊工种作业证号 -->
			<div class="cell">
				<div class="cell_title">
					<span>
						吊装人员及
						<br />特殊工种作业证号
					</span>
				</div>
				<div class="cell_value">
					<div class="cell_value_people">
						<div class="cell_input" @click="selectUser('work_permit_1')">
							<span>{{ work_permit_1.name || "点击选择" }}</span>
							<van-icon name="plus" />
						</div>
						<div class="cell_input" @click="selectUser('work_permit_2')">
							<span>{{ work_permit_2.name || "点击选择" }}</span>
							<van-icon name="plus" />
						</div>
					</div>
				</div>
			</div>
			<!-- 吊装指挥及特殊工种作业证号 -->
			<div class="cell">
				<div class="cell_title">
					<span>
						吊装指挥及
						<br />特殊工种作业证号
					</span>
				</div>
				<div class="cell_value" @click="selectUser('work_permit_3')">
					<span>{{ work_permit_3.name || "点击选择" }}</span>
					<span class="cell_value_arrow">
						<van-icon name="arrow" />
					</span>
				</div>
			</div>
			<!-- 危害辨识 -->
			<cell-select-tag required title="危害辨识" storeKey="whsb" :tagList="whsb" :showList="list_1" :storeModule="storeModule"></cell-select-tag>
			<!-- 作业开始时间 -->
			<cell-time title="作业开始时间" v-model="sendData.zyksDate" :maxTime="sendData.zyjsDate" required></cell-time>
			<!-- 作业结束时间 -->
			<cell-time title="作业结束时间" v-model="sendData.zyjsDate" :minTime="sendData.zyksDate" required></cell-time>
			<!-- 作业负责人 -->
			<cell-select-user title="作业负责人" :value="sendData.zyfzr" required :storeModule="storeModule" storeKey="zyfzr" v-model="sendData.zyfzr"></cell-select-user>
			<!-- 监护人 -->
			<cell-select-user title="负责人" :value="sendData.jhr" required :storeModule="storeModule" storeKey="jhr" v-model="sendData.jhr"></cell-select-user>
			
			<div class="confirm">
				<div class="head">
					<div class="head_1">安全措施</div>
					<div class="head_2">确认</div>
					<div class="head_3">确认人</div>
				</div>
				<div class="confirm_list">
					<Signature :checked="checked[0] ? checked[0].checked : false" :img="checked[0] ? checked[0].img : ''" @checked="showSignature(0)"
					 @cancel="signatureCancel(0)">
						<div slot>吊装质量大于等于40t的重物和土建工程主体结构;吊装物体虽不足40t,但形状复杂、刚度小、长径比大、精密贵重,作业条件特殊,已编制吊装作业方案,且经作业主管部门和安全管理部门审查,报主管(主管安全生产副总/总工程师批准)</div>
					</Signature>
					<Signature :checked="checked[1] ? checked[1].checked : false" :img="checked[1] ? checked[1].img : ''" @checked="showSignature(1)"
					 @cancel="signatureCancel(1)">
						<div slot>指派专人监护,并监守岗位,非作业人员禁止入内</div>
					</Signature>
					<Signature :checked="checked[2] ? checked[2].checked : false" :img="checked[2] ? checked[2].img : ''" @checked="showSignature(2)"
					 @cancel="signatureCancel(2)">
						<div slot>作业人员已按规定佩戴防护器具和个体防护用品</div>
					</Signature>
					<Signature :checked="checked[3] ? checked[3].checked : false" :img="checked[3] ? checked[3].img : ''" @checked="showSignature(3)"
					 @cancel="signatureCancel(3)">
						<div slot>已与分厂(车间)负责人取得联系,建立联系信号</div>
					</Signature>
					<Signature :checked="checked[4] ? checked[4].checked : false" :img="checked[4] ? checked[4].img : ''" @checked="showSignature(4)"
					 @cancel="signatureCancel(4)">
						<div slot>已在吊装现场设置安全警戒标志,无关人员不许进入作业现场；</div>
					</Signature>
					<Signature :checked="checked[5] ? checked[5].checked : false" :img="checked[5] ? checked[5].img : ''" @checked="showSignature(5)"
					 @cancel="signatureCancel(5)">
						<div slot>室外作业遇到(大雪/暴雨/大雾/六级以上大风),已停止作业</div>
					</Signature>
					<Signature :checked="checked[6] ? checked[6].checked : false" :img="checked[6] ? checked[6].img : ''" @checked="showSignature(6)"
					 @cancel="signatureCancel(6)">
						<div slot>检查起重吊装设备、钢丝绳、揽风绳、链条、吊钩等各种机具,保证安全可靠</div>
					</Signature>
					<Signature :checked="checked[7] ? checked[7].checked : false" :img="checked[7] ? checked[7].img : ''" @checked="showSignature(7)"
					 @cancel="signatureCancel(7)">
						<div slot>明确分工、坚守岗位,并按规定的联络信号,统一指挥</div>
					</Signature>
					<Signature :checked="checked[8] ? checked[8].checked : false" :img="checked[8] ? checked[8].img : ''" @checked="showSignature(8)"
					 @cancel="signatureCancel(8)">
						<div slot>将建筑物、构筑物作为锚点,需经土建工程部门审查核算并批准</div>
					</Signature>
					<Signature :checked="checked[9] ? checked[9].checked : false" :img="checked[9] ? checked[9].img : ''" @checked="showSignature(9)"
					 @cancel="signatureCancel(9)">
						<div slot>吊装绳索、揽风绳、拖拉绳等避免同带电线路接触,并保持安全距离</div>
					</Signature>
					<Signature :checked="checked[10] ? checked[10].checked : false" :img="checked[10] ? checked[10].img : ''" @checked="showSignature(10)"
					 @cancel="signatureCancel(10)">
						<div slot>人员随同吊装重物或吊装机械升降,应采取可靠的安全措施,并经过现场指挥人员批准</div>
					</Signature>
					<Signature :checked="checked[11] ? checked[11].checked : false" :img="checked[11] ? checked[11].img : ''" @checked="showSignature(11)"
					 @cancel="signatureCancel(11)">
						<div slot>利用管道、管架、电杆、机电设备等作吊装锚点,不准吊装</div>
					</Signature>
					<Signature :checked="checked[12] ? checked[12].checked : false" :img="checked[12] ? checked[12].img : ''" @checked="showSignature(12)"
					 @cancel="signatureCancel(12)">
						<div slot>悬吊重物下方站人、通行和工作,不准吊装</div>
					</Signature>
					<Signature :checked="checked[13] ? checked[13].checked : false" :img="checked[13] ? checked[13].img : ''" @checked="showSignature(13)"
					 @cancel="signatureCancel(13)">
						<div slot>超负荷或重物质量不明,不准吊装</div>
					</Signature>
					<Signature :checked="checked[14] ? checked[14].checked : false" :img="checked[14] ? checked[14].img : ''" @checked="showSignature(14)"
					 @cancel="signatureCancel(14)">
						<div slot>斜拉重物、重物埋在地下或重物坚固不牢,绳打结、绳不齐,不准吊装</div>
					</Signature>
					<Signature :checked="checked[15] ? checked[15].checked : false" :img="checked[15] ? checked[15].img : ''" @checked="showSignature(15)"
					 @cancel="signatureCancel(15)">
						<div slot>棱角重物没有衬垫措施,不准吊装</div>
					</Signature>
					<Signature :checked="checked[16] ? checked[16].checked : false" :img="checked[16] ? checked[16].img : ''" @checked="showSignature(16)"
					 @cancel="signatureCancel(16)">
						<div slot>安全装置失灵,不准吊装</div>
					</Signature>
					<Signature :checked="checked[17] ? checked[17].checked : false" :img="checked[17] ? checked[17].img : ''" @checked="showSignature(17)"
					 @cancel="signatureCancel(17)">
						<div slot>用定型起重吊装机械(履带、轮胎、轿式吊车等)进行吊装作业,遵守该定型机械的操作规程</div>
					</Signature>
					<Signature :checked="checked[18] ? checked[18].checked : false" :img="checked[18] ? checked[18].img : ''" @checked="showSignature(18)"
					 @cancel="signatureCancel(18)">
						<div slot>作业现场出现危险品泄漏,立即停止作业,撤离人员</div>
					</Signature>
					<Signature :checked="checked[19] ? checked[19].checked : false" :img="checked[19] ? checked[19].img : ''" @checked="showSignature(19)"
					 @cancel="signatureCancel(19)">
						<div slot>作业完成后现场杂物已清理</div>
					</Signature>
					<Signature :checked="checked[20] ? checked[20].checked : false" :img="checked[20] ? checked[20].img : ''" @checked="showSignature(20)"
					 @cancel="signatureCancel(20)">
						<div slot>吊装作业人员持有法定的有效的证件</div>
					</Signature>
					<Signature :checked="checked[21] ? checked[21].checked : false" :img="checked[21] ? checked[21].img : ''" @checked="showSignature(21)"
					 @cancel="signatureCancel(21)">
						<div slot>地下通讯、网络电(光)缆、排水沟盖板,承重吊装机械的负重量已确认,保护措施已落实</div>
					</Signature>
					<Signature :checked="checked[22] ? checked[22].checked : false" :img="checked[22] ? checked[22].img : ''" @checked="showSignature(22)"
					 @cancel="signatureCancel(22)">
						<div slot>
							起吊物的质量
							<van-stepper v-model="value" />吨经确认,在吊装机械的承重范围；
						</div>
					</Signature>
					<Signature :checked="checked[23] ? checked[23].checked : false" :img="checked[23] ? checked[23].img : ''" @checked="showSignature(23)"
					 @cancel="signatureCancel(23)">
						<div slot>在吊装高度的管线、电缆桥架已做好防护措施</div>
					</Signature>
					<Signature :checked="checked[24] ? checked[24].checked : false" :img="checked[24] ? checked[24].img : ''" @checked="showSignature(24)"
					 @cancel="signatureCancel(24)">
						<div slot>作业现场围栏、警戒线、警告牌、夜间警示灯已按要求设置</div>
					</Signature>
					<Signature :checked="checked[25] ? checked[25].checked : false" :img="checked[25] ? checked[25].img : ''" @checked="showSignature(25)"
					 @cancel="signatureCancel(25)">
						<div slot>吊装作业人员持有法定的有效的证件</div>
					</Signature>
					<Signature :checked="checked[26] ? checked[26].checked : false" :img="checked[26] ? checked[26].img : ''" @checked="showSignature(26)"
					 @cancel="signatureCancel(26)">
						<div slot>作业高度和转臂范围内,无架空线路</div>
					</Signature>
					<Signature :checked="checked[27] ? checked[27].checked : false" :img="checked[27] ? checked[27].img : ''" @checked="showSignature(27)"
					 @cancel="signatureCancel(27)">
						<span>
							人员出入口和撤离安全措施已落实:
							<span :class="mask[0] == 1 ? 'seclct_tag is_select':'seclct_tag'" @click="changeMask(0)">指示牌</span>
							<span :class="mask[1] == 1 ? 'seclct_tag is_select':'seclct_tag'" @click="changeMask(1)">指示灯</span>
						</span>
					</Signature>
					<Signature :checked="checked[28] ? checked[28].checked : false" :img="checked[28] ? checked[28].img : ''" @checked="showSignature(28)"
					 @cancel="signatureCancel(28)">
						<div slot>
							<span>夜间作业采用足够、充足照明，</span>
							<span>
								A防水型灯:
								<span :class="Alight == 0? 'seclct_tag is_select': 'seclct_tag'" @click="Alight = 0">36V</span>
								<span :class="Alight == 1? 'seclct_tag is_select': 'seclct_tag'" @click="Alight = 1">24V</span>
								<span :class="Alight == 2? 'seclct_tag is_select': 'seclct_tag'" @click="Alight = 2">12V</span>
							</span>
							<span>
								防爆型灯:
								<span :class="light == 0? 'seclct_tag is_select': 'seclct_tag'" @click="light = 0">36V</span>
								<span :class="light == 1? 'seclct_tag is_select': 'seclct_tag'" @click="light = 1">24V</span>
								<span :class="light == 2? 'seclct_tag is_select': 'seclct_tag'" @click="light = 2">12V</span>
							</span>
						</div>
					</Signature>
					<Signature :checked="checked[29] ? checked[29].checked : false" :img="checked[29] ? checked[29].img : ''" @checked="showSignature(29)"
					 @cancel="signatureCancel(29)">
						<div slot>作业人员已佩戴防护器具</div>
					</Signature>
					<Signature :checked="checked[30] ? checked[30].checked : false" :img="checked[30] ? checked[30].img : ''" @checked="showSignature(30)"
					 @cancel="signatureCancel(30)">
						<div slot>
							其他安全措施:
							<div class="content_lang_input">
								<input type="text" />
							</div>
						</div>
					</Signature>
				</div>
	
			</div>
			
			<van-popup class="popup" v-model="signatureShow" :close-on-click-overlay="false" position="bottom">
				<Canvas ref="signature" @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
			</van-popup>

			<!-- 其他安全措施 -->
			<cell-textarea title="其他安全措施" required placeholder="请输入其他安全措施"></cell-textarea>

			<!-- 签字 -->
			<cell-input title="签字" required placeholder="请签字"></cell-input>

		</div>
		<!-- 操作Popup -->
		<van-popup v-model="isShowAction" position="bottom" class="action">
			<button>保存</button>
			<button>工作流提交</button>
			<button @click="closeAction">取消</button>
		</van-popup>
	</div>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	import {
		business
	} from "@/mixin/business";
	import {
		uploadFile
	} from "@/mixin/uploadFile";
	import Canvas from "@/components/Canvas.vue";
	import Signature from "../components/Signature.vue";
	export default {

		name: "gaochu",
		mixins: [business, uploadFile],
		components: {
			Signature,
			Canvas
		},
		
		created() {
			this.zypcode = this.$route.query.zypcode || 0;
			this.getInfo();
		},

		computed: mapState({
			whsb: state => state.diaozhuang.whsb,
			zyfzr: state => state.diaozhuang.zyfzr,
			jhr: state => state.diaozhuang.jhr,
			work_permit_1: state => state.diaozhuang.work_permit_1,
			work_permit_2: state => state.diaozhuang.work_permit_2,
			work_permit_3: state => state.diaozhuang.work_permit_3
		}),

		data() {

			return {
				zypcode:0,
				isShowAction: false,
				checked: [{
					checked: false,
					image: ""
				}],
				signatureShow: false,
				mask: [0, 1],
				value:5,
				light:0,
				Alight: 0,
				storeModule: "diaozhuang",
				dzgjmcColumns: ["吊车", "行车", "把杆"],
				materialColumns: ["吊车", "行车", "把杆"],
				currentDate: new Date(),
				list_1: [
					"锁具断裂",
					"吊钩脱落",
					"设备倾倒",
					"吊装机械故障倾倒",
					"周边电线杆",
					"输电线",
					"危化品管道泄漏",
					"可燃液体",
					"气体泄漏"
				],
				checked: [{
					checked: false,
					image: ""
				}],
				sendData: {
					dznr: "", //吊装内容
					dzdd: "", //吊装地点
					dzgjmc: null, //吊装工具名称
					qdzwzl: "", //起吊重物质量(t)
					whsb: [], //危害辨识
					zyksDate: "", //作业开始时间
					zyjsDate: "", //作业结束时间
					zyfzr: [], // 作业负责人
					jhr: [] //监护人
				}
				
			}

		},
		methods: {
			
			
			...mapMutations('diaozhuang', {
				setTag: 'setTag'
			}),
			
			// 选择作业证
			selectUser(work_permit) {
				console.log("work_permit: ", work_permit);
				this.$router.push({
					path: "./select_work_permit",
					query: {
						storeModule: this.storeModule,
						storeKey: work_permit
					}
				});
			},
			
			//获取详情
			getInfo() {
			
				let sendData = {};
				sendData.__sid = this.$userInfo.sessionId;
				sendData.zypcode = this.zypcode;
				this.$api.page_3
					.htHseDzzypList(sendData)
					.then(res => {
						
						const info=res.list[0];
						
						this.sendData.dznr=info.dznr;
						this.sendData.dzdd=info.dzdd;
						this.sendData.dzgjmc=info.dzgjmc;
						this.sendData.qdzwzl=info.qdzwzl;
						this.sendData.zyksDate=info.zyksDate;
						this.sendData.zyjsDate=info.zyjsDate;
						this.sendData.id=info.id;
						
						let zyfzr=[];
						info.zyfzr.split(",").map(items=>{
							zyfzr.push({
								userName:items
							});
						})
						this.sendData.zyfzr=zyfzr;
						
						let jhr=[];
						info.jhr.split(",").map(items=>{
							jhr.push({
								userName:items
							});
						})
						this.sendData.jhr=jhr;
						
						let whsb=[];
						info.whsb.split(",").map(items=>{
							whsb.push(this.list_1[items]);
						})
						this.setTag({tags:{key:"whsb",value:whsb}});
						
					})
					.catch(() => {
			
					});
			
			},

			// 打开操作Popup
			openAction() {
				this.isShowAction = true;
			},
			// 关闭操作Popup
			closeAction() {
				this.isShowAction = false;
			},
			// 显示签名
			showSignature(index) {
				console.log("index: ", index);
				console.log("显示签名");
				this.xuhao = index;
				this.signatureShow = true;
			},
			// 取消签名
			signatureCancel(index) {
				console.log("index: ", index);
				console.log("取消");
				this.checked[index].checked = false;
				this.checked[index].img = "";
			},
			saveCanvas(e) {
				this.signatureShow = false;
				this.checked[this.xuhao] = {
					checked: false,
					img: ""
				};
				this.checked[this.xuhao].img = e;
				console.log("signatureShow: ");
			},
			cancelCanvas() {
				this.checked[this.xuhao].checked = false;
				this.checked[this.xuhao].img = "";
				this.signatureShow = false;
			}

		}

	}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/cell.scss";

	.mangban {
		background-color: #fff;

		.next {
			width: 100%;
			height: 98px;
			margin-top: 25px;
			font-size: 32px;
			text-align: center;
			color: rgba(255, 255, 255, 1);
			line-height: 98px;
			background: rgba(96, 150, 248, 1);
			box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
		}
	}

	.head {
		display: flex;
		text-align: center;
		margin-bottom: 20px;

		.head_1 {
			width: 420px;
		}

		.head_2 {
			width: 100px;
		}

		.head_3 {
			width: 300px;
		}
	}

	.action {
		padding-left: 30px;
		padding-right: 30px;
		background-color: transparent;

		button {
			width: 100%;
			height: 110px;
			margin-bottom: 20px;
			background-color: white;
			border: none;
			border-radius: 30px;
			color: rgb(0, 118, 255);
			font-size: 35px;
		}
	}
</style>
