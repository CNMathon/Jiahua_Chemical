<!-- 吊装列表页 -->
<template>
	<van-list class="home">
		<van-sticky>
			<van-nav-bar title="吊装安全" left-text="返回" right-text="发起" left-arrow @click-left="pageBack" @click-right="onClickRight" />
			<j-filter-bar v-model="searchValue" placeholder="请输入吊装内容名称" @search="getListData(true)" @tap="setShowFilter()"></j-filter-bar>
		</van-sticky>
		<j-filter v-model="showFilter" @confirm="confirmFilter">
			<j-filter-search v-model="searchValues" @search="filterSearch"></j-filter-search>
			<j-filter-item title="作业票状态" :actions="zypztList" @select="filterSelect_1"></j-filter-item>
			<j-filter-cell title="申请部门"></j-filter-cell>
			<j-filter-cell title="申请人"></j-filter-cell>
		</j-filter>
		<van-pull-refresh v-model="isLoading" @refresh="getListData(true)">
			<van-list v-model="loading" :finished="finished" :error.sync="error" error-text="请求失败，点击重新加载" finished-text="没有更多了"
			 @load="getListData()">
				<div class="list">
					<div class="list-card-area">
						<div v-for="(item, index) in pageList" :key="index">
							<div class="donghuo-list-card donghuo-list-card-nolast">
								<div class="left">
									<div class="left-line left-line-notlast">吊装内容：{{ item.dznr }}</div>
									<div class="left-line left-line-notlast">吊装地点：{{ item.dzdd }}</div>
									<div class="left-line left-line-notlast">起吊重物质量：{{ item.qdzwzl }}</div>
									<div class="left-line left-line-notlast">申请部门：{{ item.sqbm }}</div>
									<div class="left-line left-line-notlast">申请人：{{ item.sqr }}</div>
									<div class="left-line left-line-notlast">作业开始时间：{{ item.zyksDate }}</div>
									<div class="left-line">作业结束时间：{{ item.zyjsDate }}</div>
								</div>
								<div class="right" @click.stop="()=>{$router.push({path:'/page_3/diaozhuang/index',query:{id:item.id}})}" v-if="item.htStatus == 1">编辑</div>
								<div class="right" @click.stop="()=>{$router.push({path:'/page_3/diaozhuang/index2',query:{id:item.id}})}" v-if="item.htStatus == 2">初审</div>
								<div class="right" v-if="item.htStatus == 3">有效</div>
								<div class="right" v-if="item.htStatus == 4">已验票</div>
								<div class="right" v-if="item.htStatus == 5">已终结</div>
							</div>
						</div>
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
	</van-list>
</template>

<script>
	import {
		mixin
	} from "@/mixin/mixin";
	export default {
		data() {
			return {
				isLoading: false, //页面是否正在下拉刷新
				error: false, //加载错误
				loading: false, //页面是否在加载中
				finished: false, //数据是否加载完毕
				pageNow: 1, //当前页数
				pageSize: 20, //每页加载数量
				totalNumber: 10, //总条数
				pageList: [], //页面数据
				showFilter: false,
				searchValue: "",
				searchValues: "",
				cbslist: [],
				selectCbs: {}, //选择的承包商
				confirmSelectCbs: {},
				zypztList: [{
						name: "编辑",
						idnex: 1
					},
					{
						name: "初审",
						idnex: 2
					},
					{
						name: "有效",
						idnex: 3
					},
					{
						name: "已验票",
						idnex: 4
					},
					{
						name: "已终结",
						idnex: 5
					}
				] // 作业票状态列表
			};
		},
		mixins: [mixin],
		methods: {
			/**
			 * 获取吊装工作票
			 */
			getListData(refresh = false) {
				if (refresh) {
					this.pageNow = 10;
					this.isLoading = true;
					this.finished = true;
				}
				// 数据全部加载完成
				else if (this.pageList.length >= this.totalNumber) {
					this.loading = false;
					this.finished = true;
					this.isLoading = false;
					return;
				}
				let sendData = {};
				sendData.__sid = this.$userInfo.sessionId;
				this.$api.page_3
					.htHseDzzypList(sendData)
					.then(res => {
						// 加载状态结束
					  	console.log(res)
						this.loading = false;
						this.isLoading = false;
						this.pageNow = this.pageNow + 1;
						if (res.list === []) {
							this.finished = true;
							return;
						}
						this.pageList = refresh ? res.list : [...this.pageList, ...res.list];
						this.totalNumber = res.count;
					})
					.catch(() => {
						this.error = true;
						this.loading = false;
						this.finished = false;
						this.isLoading = false;
					});
			},
			setShowFilter() {
				this.showFilter = true;
			},
			filterSearch() {},
			filterSelect_1() {},
			confirmFilter() {},
			onClickRight() {
				this.$router.push({
					path: "../diaozhuang"
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.donghuo {
		background-color: #f5f5f5;
	}

	.list-card-area {
		width: 90%;
		margin: 0 auto;
	}

	.donghuo-list-card {
		display: flex;
		justify-content: space-between;
		width: 100%;
		background-color: #6096f8;
		padding: 22px 31px 15px 34px;
		color: #ffffff;
		border-radius: 10px;
	}

	.donghuo-list-card-nolast {
		margin-bottom: 20px;
	}

	.left-line-notlast {
		margin-bottom: 7px;
	}

	.left {
		font-size: 0.8rem;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.right {
		line-height: 118.3 * 2px;
		font-size: 1.1rem;
	}
</style>
