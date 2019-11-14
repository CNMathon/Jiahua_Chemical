<template>
	<div class="yinhuan">
		<van-nav-bar title="隐患整改通知" left-text="返回" left-arrow @click-left="pageBack" />
		<div class="cell_group">
			<!-- 整改单名称 -->
			<cell-input v-model="sendData.rectificationName" title="整改单名称" required placeholder="输入整改单名称"></cell-input>
			<!-- 整改公司 -->
			<div class="cell">
				<div class="cell_title">
					<span>整改公司</span>
					<span class="required">*</span>
				</div>
				<div class="cell_value">
					<div class="cell_input">
						<input type="text" v-model="sendData.rectificationCompany" placeholder="整改公司名称" />
					</div>
					<span class="cell_value_arrow">
						<van-icon name="search" />
					</span>
				</div>
			</div>
			<!-- 违章单位 -->
			<div class="cell">
				<div class="cell_title">
					<span>
						整改部门或
						<br />督察部门
					</span>
				</div>
				<div class="cell_value">
					<div class="cell_input">
						<input type="text" v-model="sendData.rectificationDepartment" placeholder="整改部门名称" />
					</div>
					<span class="cell_value_arrow">
						<van-icon name="search" />
					</span>
				</div>
			</div>
			<!-- 整改负责人 -->
			<cell-select-users title="整改负责人" required :storeModule="storeModule" storeKey="rectificationCharge" v-model="sendData.rectificationCharge"></cell-select-users>
			<!-- 地点 -->
			<cell-input v-model="sendData.location" title="地点" required placeholder="输入地点"></cell-input>
			<!-- 隐患等级 -->
			<cell-picker title="隐患等级" required v-model="sendData.dangerLevel" :columns="dangerLevelColumns"></cell-picker>
			<!-- 隐患类型 -->
			<cell-picker title="隐患类型" required v-model="sendData.dangerType" :columns="dangerTypeColumns"></cell-picker>
			<!-- 隐患来源 -->
			<cell-picker title="隐患来源" required v-model="sendData.dangerSource" :columns="dangerSourceColumns" keyType="text"></cell-picker>
			<!-- 是否处罚 -->
			<cell-picker title="是否处罚" required v-model="sendData.isPunish" :columns="isPunishColumns"></cell-picker>
			<!-- 处罚金额 -->
			<cell-input v-model="sendData.punishMoney" title="处罚金额" inputType="number" required placeholder="输入金额">
				<div slot="right">元</div>
			</cell-input>
			<!-- 是否处挂起 -->
			<cell-value title="是否处挂起" :value="isSuspendedColumns[sendData.isSuspended]" required></cell-value>
			<!-- 隐患描述 -->
			<cell-textarea title="隐患描述" required v-model="sendData.dangerDesc" placeholder="输入内容"></cell-textarea>
			<!-- 上传图片 -->
			<div class="cell">
				<div class="cell_title">
					<span>上传图片</span>
				</div>
				<div class="cell_other">
					<div class="upload">
						<div class="upload_icon">
							<van-icon name="photo-o" />
						</div>
						<div class="upload_box">
							<van-uploader :before-read="beforeRead" :before-delete="beforeDelete" v-model="fileList" preview-size="5rem"
							 multiple />
						</div>
					</div>
				</div>
			</div>
			<!-- 验收负责人 -->
			<cell-select-users title="验收负责人" required :storeModule="storeModule" storeKey="acceptanceCharge" v-model="sendData.acceptanceCharge"></cell-select-users>
		</div>
		<div class="next" @click="postData">提交</div>
	</div>
</template>
<script>
	import {
		mapState
	} from "vuex";
	import {
		business
	} from "@/mixin/business";
	import {
		uploadFile
	} from "@/mixin/uploadFile";
	export default {
		name: "yinhuan",
		mixins: [business, uploadFile],
		created() {

			if (this.$route.query.id) {
				this.id = this.$route.query.id;
				this.getDataInfo();
			}
			
		},
		data() {
			return {
				storeModule: "yinhuan",
				id: 0,
				sendData: {
					rectificationName: "", //整改单
					rectificationCompany: "", //整改公司
					rectificationDepartmen: "", //整改部门
					rectificationCharge: [], //整改负责人
					location: "", //地点
					isPunish: "", //是否处罚
					isSuspended: 0, //是否处挂起
					dangerLevel: "", //隐患等级
					dangerType: "", //隐患类型
					dangerSource: "", //隐患来源
					acceptanceCharge: [], //验收负责人
					punishMoney: "", //处罚金额
					dangerDesc: "" //隐患描述
				},
				isPunishColumns: ["是", "否"],
				isSuspendedColumns: ["否", "是"],
				/* dangerSourceColumns: [{
						text: "行为观察卡",
						key: "XWGCK"
					},
					{
						text: "风险/隐患识别卡",
						key: "YHSBK"
					},
					{
						text: "安全检查记录",
						key: "AQJCJL"
					},
					{
						text: "承包商约谈",
						key: "CBSYT"
					}
				], */ //隐患来源
				dangerSourceColumns: ["行为观察卡", "风险/隐患识别卡", "安全检查记录", "承包商约谈"],
				dangerLevelColumns: ["一般", "较大", "重大"], //隐患等级
				dangerTypeColumns: [
					"作业票",
					"喷溅/泄露",
					"狭小空间/阻碍",
					"个人防护设备",
					"电气",
					"燃烧/火灾",
					"工具使用不当",
					"作业设备/工具缺陷",
					"标签标示",
					"敲击/打击",
					"能量隔离",
					"环保",
					"跌落/绊倒",
					"卫生",
					"机械完整性",
					"交通",
					"中毒/窒息"
				] //隐患类型
			};
		},
		computed: mapState({
			acceptanceCharge: state => state.yinhuan.acceptanceCharge,
			rectificationCharge: state => state.yinhuan.rectificationCharge
		}),
		beforeDestroy() {
			this.$store.dispatch("yinhuan/cleanState");
		},
		watch: {
			// 验收负责人
			acceptanceCharge(val) {
				this.sendData.acceptanceCharge = val;
			},
			// 验收负责人
			rectificationCharge(val) {
				this.sendData.rectificationCharge = val;
			},
			//隐患等级
			"sendData.dangerLevel"(val) {
				if (val === 3) {
					this.sendData.isSuspended = 1;
				} else {
					this.sendData.isSuspended = 0;
				}
			},
			//隐患等级
			"sendData.dangerSource"(val) {
				this.sendData.dangerSource = val
			}
		},
		methods: {
			//获取详情
			getDataInfo() {

				this.$api.page_3
					.dangerRectificationForm({
						__sid: localStorage.getItem("JiaHuaSessionId"),
						id: this.id
					})
					.then(res => {

						const info = res.dangerRectification;

						this.sendData.rectificationName = info.rectificationName || "";
						this.sendData.rectificationCompany = info.rectificationCompany || "";
						this.sendData.rectificationDepartment = info.rectificationDepartment || "";
						this.sendData.location = info.location || "";
						this.sendData.id = info.id;

						this.sendData.isPunish = parseInt(info.isPunish || 0) + 1;
						this.sendData.dangerLevel = parseInt(info.dangerLevel || 0) + 1;
						this.sendData.dangerType = parseInt(info.dangerType || 0) + 1;
						this.sendData.dangerSource = parseInt(info.dangerSource || 0) + 1;
						this.sendData.punishMoney = info.punishMoney || "";
						this.sendData.dangerDesc = info.dangerDesc || "";

						if (info.ysfzr) {
							this.sendData.acceptanceCharge.push({
								avatarUrl: this.$imageUrl + info.ysfzr.avatarUrl,
								fullName: "",
								userCode: info.ysfzr.userCode,
								userName: info.ysfzr.userName
							});
						}

						if (info.zgfzr) {
							this.sendData.rectificationCharge.push({
								avatarUrl: this.$imageUrl + info.zgfzr.avatarUrl,
								fullName: "",
								userCode: info.zgfzr.userCode,
								userName: info.zgfzr.userName
							});
						}

						console.log(this.sendData);


					}).catch(() => {});

			},
			// 发送数据
			postData() {

				const that = this;
				let sendData = JSON.parse(JSON.stringify(this.sendData));

				sendData.acceptanceCharge = this.userString(
					sendData.acceptanceCharge,
					"userCode"
				);
				sendData.rectificationCharge = this.userString(
					sendData.rectificationCharge,
					"userCode"
				);
				sendData.__sid = this.$userInfo.sessionId;

				this.$api.page_3
					.dangerRectificationSave(sendData)
					.then(res => {
						this.$Toast.success({
							message: "提交成功",
							onClose() {
								that.pageBack();
							}
						});
					})
					.catch(() => {});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/cell.scss";

	.yinhuan {
		min-height: 100vh;
		background-color: #f5f5f5;

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
</style>
