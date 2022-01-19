<template>
  <div class="card">
    <div class="card-top">
      <img class="card-top__image" :src="'https://live.staticflickr.com/65535/51821757618_ee0ed812c0_m.jpg'" alt>
      <div class="card-top-tags">
        <div
            class="card-top-tags__tag"
            v-for="(item, index) in tags"
            :key="index"
            :style="`background: #${item.Color}`"
        >
          <span class="card-top-tags__tag__name">{{item.Name}}</span>
        </div>
      </div>
    </div>
    <div class="card-info">
      <div class="card-info-title">
        <span class="card-info-title__name">Dimitry Kolesnikov</span>
        <span class="card-info-title__position">Sr Full-stack engineer</span>
      </div>
      <div class="card-info__separator"></div>
      <div class="card-info-detail">
        <div class="card-info-detail-ranges">
          <div class="card-info-detail-ranges-range">
            <div class="card-info-detail-ranges-range__header">
              <span class="card-info-detail-ranges-range__header__thin">Profit</span>
              <span class="card-info-detail-ranges-range__header__bold">+ $257</span>
            </div>
            <div class="card-info-detail-ranges-range-bar">
              <div
                  class="card-info-detail-ranges-range-bar__elem"
                  :style="`width: ${calcProfit}%; background: #${profit.Color}; z-index: 1`"
              ></div>
            </div>
          </div>
          <div class="card-info-detail-ranges-range">
            <div class="card-info-detail-ranges-range__header">
              <span class="card-info-detail-ranges-range__header__thin">Attention</span>
              <span class="card-info-detail-ranges-range__header__bold">48 h</span>
            </div>
            <div class="bar card-info-detail-ranges-range-bar" style="position: relative">
              <div
                  class="card-info-detail-ranges-range-bar__elem"
                  v-for="(item, index) in calcProgress"
                  :key="index"
                  :style="`width: ${item.Width}%; background: #${item.Color}; z-index: ${index}`"
              ></div>
            </div>
          </div>
        </div>
        <div class="card-info-detail-percentage">
          <div
              class="card-info-detail-percentage-block"
              v-for="(item, index) in calcRectangles"
              :key="index"
          >
            <div
                class="card-info-detail-percentage-block__rectangle"
                :style="`background: #${item.Color}; width: ${item.Width}%`"
            ></div>
            <div
                class="card-info-detail-percentage-block__percentage"
                :class="{absolute: item.Absolute, spacing: item.Less}"
            >
              {{ item.Amount }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PeopleCard",
  data: () => ({
    test: [
      {
        Color: "FFBCD9",
        Amount: 18
      },
      {
        Color: "A9B2C3",
        Amount: 79
      },
      {
        Color: "FFA6C9",
        Amount: 95
      }
    ],
    tags: [
      {
        Name: "NPM",
        Color: "CD607E"
      },
      {
        Name: "Python",
        Color: "8F00FF"
      },
      {
        Name: "React",
        Color: "915C83"
      }
    ],
    profit: {
      Color: "9F2B68",
      Amount: 257
    },
    lastBlock: [
      {
        id: 1,
        Amount: 15,
        Color: "E45959",
      },
      {
        id: 2,
        Amount: 12,
        Color: "E4AC59",
      },
      {
        id: 3,
        Amount: 35,
        Color: "5999E4",
      },
      {
        id: 4,
        Amount: 38,
        Color: "56D953",
      },
    ]
  }),
  computed: {
    calcProgress() {
      let result = []
      let newArray = []

      let summary = this.test.reduce((a,b) => {
        return a + b.Amount
      }, 0)

      let iterator = 100

      this.test.map(elem => newArray.push(elem))

      newArray.sort((a,b) => b.Amount - a.Amount)

      for (let i = 0; i < newArray.length; i++) {
        if (i === 0) {
          let percent = ((newArray[i].Amount)*100)/summary
          let width = iterator
          iterator-=percent
          result.push(new this.Progress(newArray[i], percent, width))
        } else {
          let percent = ((newArray[i].Amount)*100)/summary
          let width = iterator
          iterator -= percent
          result.push(new this.Progress(newArray[i], percent, width))
        }
      }
      return result
    },
    calcRectangles() {
      const result = []
      const newArray = []
      const values = []

      this.lastBlock.map(elem => newArray.push(elem))

      this.lastBlock.map(elem => values.push(elem.Amount))

      const max = Math.max(...values)

      newArray.sort((a,b) => b.Amount - a.Amount).map(elem => {
        let width = (elem.Amount*100)/max
        let absolute = width >= 85
        let less = (elem.Amount < max) && !!absolute
        result.push(new this.Rectangles(elem, width, absolute, less))
      })
      return result.sort((a,b) => a.id - b.id)
    },
    calcProfit() {
      const maximum = 560
      return (this.profit.Amount*100)/maximum
    },
  },
  methods: {
    /* Конструкторы */
    Progress(obj, percent, width) {
      this.Color = obj.Color;
      this.Amount = obj.Amount;
      this.Percent = percent;
      this.Width = width;
    },
    Rectangles(obj, width, absolute, less) {
      this.id = obj.id;
      this.Amount = obj.Amount;
      this.Color = obj.Color;
      this.Width = width;
      this.Absolute = absolute;
      this.Less = less;
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

.card {
  width: 260px;
  height: 420px;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.0001);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Montserrat', sans-serif;
  .card-top {
    display: flex;
    align-items: center;
    width: 100%;
    max-height: 146px;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    &__image {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      object-fit: fill;
    }
    .card-top-tags {
      position: absolute;
      display: flex;
      flex-direction: column;
      row-gap: 2px;
      top: 10px;
      right: 0;
      &__tag:first-child {
        right: -15px !important;
      }
      &__tag {
        height: 20px;
        max-width: 100px;
        border-radius: 5px;
        padding: 1px 9px;
        display: flex;
        align-items: center;
        right: -30px;
        position: relative;
        &__name {
          font-weight: 600;
          font-size: 12px;
          line-height: 18px;
          color: #FFFFFF;
        }
      }
    }
  }
  .card-info {
    padding: 7px 10px 29px 10px;
    .card-info-title {
      display: flex;
      flex-direction: column;
      &__name {
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;
        color: #524D64;
        padding-bottom: 1px;
      }
      &__position {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #6E6B7B;
        padding-bottom: 8px;
      }
    }
    &__separator {
      width: 100%;
      height: 2px;
      background: #454545;
      opacity: 0.1;
      margin-bottom: 10px;
    }
    .card-info-detail {
      .card-info-detail-ranges {
        padding-bottom: 20px;
        .card-info-detail-ranges-range {
          &__header {
            display: flex;
            justify-content: space-between;
            &__thin {
              font-weight: 300;
              font-size: 12px;
              line-height: 21px;
              color: #6E6B7B;
            }
            &__bold {
              font-weight: 500;
              font-size: 14px;
              line-height: 21px;
              color: #6E6B7B;
            }
          }
          .card-info-detail-ranges-range-bar {
            width: 100%;
            height: 15px;
            border-radius: 5px;
            display: flex;
            background: #D7D7D7;
            position: relative;
            z-index: 0;
            &__elem {
              height: 15px;
              border-radius: 5px;
              position: absolute;
            }
          }
        }
      }
      .card-info-detail-percentage {
        display: grid;
        grid-template-columns: 50% auto;
        column-gap: 8px;
        row-gap: 5px;
        padding: 0 17px;
        .card-info-detail-percentage-block {
          &:nth-child(2n) {
            justify-content: start;
            .card-info-detail-percentage-block__rectangle {
              order: 1;
            }
            .card-info-detail-percentage-block__percentage {
              padding-left: 5px;
              padding-right: 0;
              order: 2;
            }
            .absolute {
              right: 0;
              left: unset;
            }
          }
          display: flex;
          align-items: center;
          justify-content: end;
          position: relative;
          width: 100%;
          &__rectangle {
            height: 37px;
            opacity: 0.7;
            border-radius: 7px;
            position: relative;
            order: 2;
          }
          &__percentage {
            padding-right: 5px;
            order: 1;
          }
          .absolute {
            position: absolute;
            left: 0;
          }
          .spacing {
            left: 18px;
          }
        }
      }
    }
  }
}
</style>
