<template>
  <nav>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <a
          v-if="item.type === 'external'"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          >{{ item.text }}</a
        >
        <a v-else :href="item.link">{{ item.text }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      items: [
        { link: "#top", text: "Dashboard" },
        {
          link: "https://imimobile.bamboohr.com/home/",
          text: "Company HR",
          type: "external",
        },
        {
          link: "https://4594701.app.netsuite.com/app/center/card.nl?sc=-46&whence=",
          text: "Expenses",
          type: "external",
        },
        {
          link: "https://imimobileplc.sharepoint.com/sites/TextlocalUK/Technical/SitePages/Home.aspx?RootFolder=%2Fsites%2FTextlocalUK%2FTechnical%2FShared%20Documents%2FSprint%20Demo%20Recordings&FolderCTID=0x012000118CE2AEC170EE45AFC0F28F5B37CCA0&View=%7BD59EC08D%2D9CA4%2D4495%2DAED2%2DDD49B88AC2FE%7D#",
          text: "File Hub",
          type: "external",
        },
        {
          link: "https://imimobile.perkbox.com/perks/",
          text: "Perks",
          type: "external",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
nav {
  margin-top: 43px;
  width: 100%;
  padding-left: 12%;
  li {
    @include margin(null null 37px);
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
