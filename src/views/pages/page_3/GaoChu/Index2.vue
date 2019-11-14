<template>

	<div class="mangban">
		<van-nav-bar title="高处作业安全许可证" left-text="返回" right-text="操作" left-arrow @click-left="pageBack" @click-right="openAction" />
		<div class="cell_group">
			<!-- 申请部门 -->
			<cell-value title="申请部门" :value="$userInfo.officeName" disable></cell-value>
			<!-- 申请人 -->
			<cell-value title="申请人" :value="$userInfo.userName" disable></cell-value>
			<!-- 作业票编号 -->
			<cell-value title="作业票编号" value disable></cell-value>
			<!-- 作业票状态 -->
			<cell-value title="作业票状态" value="编辑" disable></cell-value>
			<!-- 作业内容 -->
			<cell-textarea title="作业内容" v-model="sendData.workContent" required placeholder="请输入作业内容"></cell-textarea>

			<!-- 作业地点 -->
			<cell-input title="作业地点" v-model="sendData.workAddress" required placeholder="请输作业地点"></cell-input>

			<!-- 作业高度 -->
			<cell-picker title="作业高度" v-model="sendData.workHeight" required :columns="workHeightColumns"></cell-picker>

			<!-- 登高类别 -->
			<cell-picker title="登高类别" v-model="sendData.heightType" required :columns="heightTypeColumns"></cell-picker>


			<div class="confirm">
				<div class="head">
					<div class="head_1">安全措施</div>
					<div class="head_2">确认</div>
					<div class="head_3">确认人</div>
				</div>
				<div class="confirm_list">
					<Signature :checked="checked[0] ? checked[0].checked : false" :img="checked[0] ? checked[0].img : ''" @checked="showSignature(0)"
					 @cancel="signatureCancel(0)">
						<span slot>作业人员身体条件符合要求。</span>
					</Signature>
					<Signature :checked="checked[1] ? checked[1].checked : false" :img="checked[1] ? checked[1].img : ''" @checked="showSignature(1)"
					 @cancel="signatureCancel(1)">
						<span slot>作业人员着装符合工作要求</span>
					</Signature>
					<Signature :checked="checked[2] ? checked[2].checked : false" :img="checked[2] ? checked[2].img : ''" @checked="showSignature(2)"
					 @cancel="signatureCancel(2)">
						<span slot>作业人员佩戴合格的安全帽</span>
					</Signature>
					<Signature :checked="checked[3] ? checked[3].checked : false" :img="checked[3] ? checked[3].img : ''" @checked="showSignature(3)"
					 @cancel="signatureCancel(3)">
						<span slot>作业人员佩戴安全带，安全带高挂抵用</span>
					</Signature>
					<Signature :checked="checked[4] ? checked[4].checked : false" :img="checked[4] ? checked[4].img : ''" @checked="showSignature(4)"
					 @cancel="signatureCancel(4)">
						<span slot>作业人员携带有工具袋及安全绳</span>
					</Signature>
					<Signature :checked="checked[5] ? checked[5].checked : false" :img="checked[5] ? checked[5].img : ''" @checked="showSignature(5)"
					 @cancel="signatureCancel(5)">
						<span>
							作业人员佩戴:
							<span :class="mask[0] == 1 ? 'seclct_tag is_select':'seclct_tag'" @click="changeMask(0)">过滤式防毒面具或口罩</span>
							<span :class="mask[1] == 1 ? 'seclct_tag is_select':'seclct_tag'" @click="changeMask(1)">空气呼吸器</span>
						</span>
					</Signature>
					<Signature :checked="checked[6] ? checked[6].checked : false" :img="checked[6] ? checked[5].img : ''" @checked="showSignature(6)"
					 @cancel="signatureCancel(6)">
						<span slot>现场搭设的脚手架、防护网、围栏符合安全规定</span>
					</Signature>
					<Signature :checked="checked[7] ? checked[7].checked : false" :img="checked[7] ? checked[7].img : ''" @checked="showSignature(7)"
					 @cancel="signatureCancel(7)">
						<span slot>垂直分层作业中间有隔离设施</span>
					</Signature>
					<Signature :checked="checked[8] ? checked[8].checked : false" :img="checked[8] ? checked[8].img : ''" @checked="showSignature(8)"
					 @cancel="signatureCancel(8)">
						<span slot>绳子、梯子符合安全规定</span>
					</Signature>
					<Signature :checked="checked[9] ? checked[9].checked : false" :img="checked[9] ? checked[9].img : ''" @checked="showSignature(9)"
					 @cancel="signatureCancel(9)">
						<span slot>石棉瓦等轻型棚的承重梁、柱能承重负荷的要求</span>
					</Signature>
					<Signature :checked="checked[10] ? checked[10].checked : false" :img="checked[10] ? checked[10].img : ''" @checked="showSignature(10)"
					 @cancel="signatureCancel(10)">
						<span slot>作业人员在石棉瓦等不承重物作业所搭设的承重板稳定牢固</span>
					</Signature>
					<Signature :checked="checked[11] ? checked[11].checked : false" :img="checked[11] ? checked[11].img : ''" @checked="showSignature(11)"
					 @cancel="signatureCancel(11)">
						<span>
							采光,夜间作业照明符合作业要求,
							<span :class="light == 0? 'seclct_tag is_select': 'seclct_tag'" @click="light = 0">需采用并已采用</span>
							<span :class="light == 1? 'seclct_tag is_select': 'seclct_tag'" @click="light = 1">无需采用</span>
							防爆灯
						</span>
					</Signature>
					<Signature :checked="checked[12] ? checked[12].checked : false" :img="checked[12] ? checked[12].img : ''" @checked="showSignature(12)"
					 @cancel="signatureCancel(12)">
						<span slot>30m 以上高处作业配备通讯、联络工具</span>
					</Signature>
				</div>
				<van-popup class="popup" v-model="signatureShow" :close-on-click-overlay="false" position="bottom">
					<Canvas ref="signature" @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
				</van-popup>
			</div>

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
	} from "../../../../mixin/business";
	import GaoChuConfirm from "./Confirm";
	import StepperPlus from "@/components/StepperPlus.vue";
	import Canvas from "@/components/Canvas.vue";
	import Signature from "../components/Signature.vue";
	export default {

		name: "gaochu",
		mixins: [business],
		components: {
			Signature,
			Canvas
		},
		
		created() {
			this.gczyCode=this.$route.query.gczyCode;
			this.getData();
		},

		computed: mapState({
			reason: state => state.duanlu.reason,
			endangerSign: state => state.duanlu.endangerSign,
			workCharger: state => state.duanlu.workCharger
		}),

		data() {

			return {
				isShowAction: false,
				checked: [{
					checked: false,
					image: ""
				}],
				signatureShow: false,
				mask: [0, 1],
				light: 0,
				gczyCode:0,
				sendData: {
					workContent: "", //作业内容
					workAddress: "", //作业地点
					workHeight: "", //作业高度
					heightType: "" //登高类别
				},
				workHeightColumns: ["2-5米", "5-15米", "15-30米", "30米以上"],
				heightTypeColumns: ["Ⅰ级", "Ⅱ级", "Ⅲ级", "Ⅳ级", "特级"]

			}

		},
		methods: {

			...mapMutations('gaochu', {
				setTag: 'setTag'
			}),

			/**
			 * 获取工作票内容
			 */
			getData() {
				console.log("获取工作票内容");
				let sendData = {};
				sendData.gczyCode = this.gczyCode;
				sendData.__sid = this.$userInfo.sessionId;
				this.$api.page_3
					.htHseUpworkticketListData(sendData)
					.then(res => {

						const info = res.list[0];

						this.sendData.workContent = info.workContent;
						this.sendData.workAddress = info.workAddress;
						this.sendData.workHeight = Number(info.workHeight);
						this.sendData.heightType = Number(info.heightType);


					})
					.catch(() => {});
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
