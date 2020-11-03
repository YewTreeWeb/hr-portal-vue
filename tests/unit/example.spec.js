import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Hero from "@/components/Hero.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("Hero.vue", () => {
  it("renders props when passed", () => {
    const title = "HR Portal";
    const subtitle = "Mathew Teague";
    const wrapper = shallowMount(Hero, {
      propsData: { title, subtitle }
    });
    expect(wrapper.text()).toMatch(title, subtitle);
  });
});
