import {getI18nEnabled, registerEditorPlugin} from 'amis-editor-core';
import {BasePlugin, RegionConfig, BaseEventContext} from 'amis-editor-core';
import {defaultValue, getSchemaTpl} from 'amis-editor-core';

export class CollapsePlugin extends BasePlugin {
  static id = 'CollapsePlugin';
  // 关联渲染器名字
  rendererName = 'collapse';
  $schema = '/schemas/CollapseSchema.json';

  // 组件名称
  name = '折叠器';
  isBaseComponent = true;
  description = '折叠器，可以将内容区展开或隐藏，保持页面的整洁';
  docLink = '/amis/zh-CN/components/collapse';
  tags = ['展示'];
  icon = 'fa fa-window-minimize';
  pluginIcon = 'collapse-plugin';
  scaffold = {
    type: 'collapse',
    header: '标题',
    body: [
      {
        type: 'tpl',
        tpl: '内容',
        wrapperComponent: '',
        inline: false
      }
    ]
  };
  previewSchema = {
    ...this.scaffold
  };
  panelTitle = '折叠器';

  panelJustify = true;

  panelBodyCreator = (context: BaseEventContext) => {
    const i18nEnabled = getI18nEnabled();
    return getSchemaTpl('tabs', [
      {
        title: '属性',
        body: getSchemaTpl('collapseGroup', [
          {
            title: '基本',
            body: [
              getSchemaTpl('layout:originPosition', {value: 'left-top'}),
              {
                name: 'header',
                label: '标题',
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                pipeIn: defaultValue(
                  context?.schema?.title || context?.schema?.header || ''
                ),
                onChange: (
                  value: any,
                  oldValue: any,
                  model: any,
                  form: any
                ) => {
                  // 转换一下旧版本的title字段
                  form.setValueByName('header', value);
                  form.setValueByName('title', undefined);
                }
              },
              getSchemaTpl('collapseOpenHeader'),
              {
                name: 'headerPosition',
                label: '标题位置',
                type: 'button-group-select',
                size: 'sm',
                pipeIn: defaultValue('top'),
                options: [
                  {
                    label: '顶部',
                    value: 'top',
                    icon: 'fa fa-arrow-up'
                  },
                  {
                    label: '底部',
                    value: 'bottom',
                    icon: 'fa fa-arrow-down'
                  }
                ]
              },
              {
                name: 'showArrow',
                label: '显示图标',
                mode: 'row',
                inputClassName: 'inline-flex justify-between flex-row-reverse',
                type: 'switch',
                pipeIn: defaultValue(true)
              },

              getSchemaTpl('switch', {
                name: 'collapsable',
                label: '可折叠',
                pipeIn: defaultValue(true)
              })
            ]
          },
          getSchemaTpl('status', {
            disabled: true
          })
        ])
      },
      {
        title: '外观',
        body: getSchemaTpl('collapseGroup', [
          getSchemaTpl('style:classNames', {
            isFormItem: false,
            schema: [
              getSchemaTpl('className', {
                name: 'headingClassName',
                label: '标题类名'
              }),
              getSchemaTpl('className', {
                name: 'bodyClassName',
                label: '内容类名'
              })
            ]
          })
        ])
      }
    ]);
  };

  regions: Array<RegionConfig> = [
    {
      key: 'body',
      label: '内容区'
    }
  ];
}

registerEditorPlugin(CollapsePlugin);
